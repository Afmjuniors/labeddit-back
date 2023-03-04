import { nowDate } from "../constants/patterns";
import { PostDatabase } from "../database/PostDatabase";
import { ReactionDatabase } from "../database/ReactionDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { PostsOutputDTO, PostsDTO, CreatePostOutputDTO, PostReactionOutputDTO, CreatePostInputDTO, DeletePostInputDTO, PostReactionInputDTO, GetPostsInputDTO } from "../dto/PostDTO";
import { BadRequestError } from "../error/BadRequestError";
import { NotFoundError } from "../error/NoTFoundError";
import { Post } from "../models/Post";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager, TokenPayload } from "../services/TokenManager";
import { PostDB, PostEditDB, Reaction, Roles } from "../types";

export class PostBusiness {
    constructor(
        private postDTO: PostsDTO,
        private postDatabase: PostDatabase,
        private userDatabase: UserDatabase,
        private reactionDatabase: ReactionDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) { }

    public getPosts = async (input: GetPostsInputDTO): Promise<PostsOutputDTO[]> => {
        const {user, token} = input
        const payload = this.tokenManager.getPyaload(token)

        if (payload === null) {
            throw new BadRequestError("Usuario não logado")
        }
        console.log(user)
        let postsDB
        if (!user) {
            const posts: PostDB[] = await this.postDatabase.getAllPosts()
            postsDB = posts
        } else {
            const posts: PostDB[] = await this.postDatabase.getPostByUserId(user)
            postsDB = posts
        }
        const users = await this.userDatabase.getAllUsers()
        const posts = postsDB.map((post) => {
            const userFind = users.find((user) => user.id === post.creator_id)
            if (!userFind) {
                throw new Error("Usuario não encontrado");
            }
            const user: TokenPayload = {
                id: userFind.id,
                name: userFind.name,
                role: userFind.role
            }
            const postInst = new Post(
                post.id,
                post.content,
                post.likes,
                post.dislikes,
                post.created_at,
                post.updated_at,
                user
            )
            return postInst

        })
        const output = this.postDTO.GetPostOutputDTO(posts)

        return output

    }

    public createPost = async (input: CreatePostInputDTO): Promise<CreatePostOutputDTO> => {

        const { content, token } = input
        const payload = this.tokenManager.getPyaload(token)

        if (payload === null) {
            throw new BadRequestError("Usuario não logado")
        }
        const post = new Post(
            this.idGenerator.generate(),
            content,
            0,
            0,
            nowDate,
            nowDate,
            payload
        )
        const postDB = post.toPostDatabase()
        await this.postDatabase.insertPost(postDB)

        return this.postDTO.CreatePostOutputDTO(post)
    }

    public editPost = async (input: { data: CreatePostInputDTO, id: string }): Promise<CreatePostOutputDTO> => {

        const post = await this.postDatabase.getPostById(input.id)
        if (!post) {
            throw new NotFoundError("Post não encontrado")
        }
        const user = await this.userDatabase.getUserById(post.creator_id)
        if (!user) {
            throw new NotFoundError("Erro ao procurar Id do criador do post")
        }
        const payload = this.tokenManager.getPyaload(input.data.token)

        if (payload === null) {
            throw new BadRequestError("Token invalido")
        }
        if (payload.id !== user.id) {
            throw new BadRequestError("Apenas o criador pode editar o post")

        }

        const postEdited = new Post(
            post.id,
            post.content,
            post.likes,
            post.dislikes,
            post.created_at,
            post.updated_at,
            user)

        postEdited.setContent(input.data.content)
        postEdited.setUpdatedAt(nowDate)
        const toEdit: PostEditDB = {
            content: postEdited.getContent(),
            updated_at: postEdited.getUpdatedAt()
        }

        await this.postDatabase.editPostbyId(postEdited.getId(), toEdit)

        const output = this.postDTO.CreatePostOutputDTO(postEdited)
        return output


    }

    public deletePost = async (input: DeletePostInputDTO) => {

        const {token,id} = input
        const payload = this.tokenManager.getPyaload(token)
        if (payload === null) {
            throw new BadRequestError("Usuario não logado")
        }

        if (payload.role !== Roles.ADMIN) {
        const postsCreatedByUser = await this.postDatabase.getPostByUserId(payload.id)

        const isPostByUser = postsCreatedByUser.find((post) => post.id === id)
     
            if (!isPostByUser) {
                throw new BadRequestError("Post não foi criado pelo usuario")
            }
        }


        await this.postDatabase.deletePostById(id)
        
        return this.postDTO.DeletePostOutputDTO()
    }
    public reactionPost = async (input:PostReactionInputDTO): Promise<PostReactionOutputDTO> => {
        const {like,idPost,token} = input
        const likeStr = like ? "like" : "dislike"

        const payload = this.tokenManager.getPyaload(token)

        if (payload === null) {
            throw new BadRequestError("Usuario não logado")
        }

        const user = await this.userDatabase.getUserById(payload.id)
        if (!user) {
            throw new NotFoundError("Usuario não encontrado")
        }
        const userOutput: TokenPayload  = {
            id: user.id,
            name: user.name,
            role: user.role
        }
        const postDB = await this.postDatabase.getPostById(idPost)
        if (!postDB) {
            throw new NotFoundError("Post não encontrado")
        }
        const post = new Post(
            postDB.id,
            postDB.content,
            postDB.likes,
            postDB.dislikes,
            postDB.created_at,
            postDB.updated_at,
            userOutput
        )

        const reactionDB: Reaction = {
            user_id: user.id,
            post_id: idPost,
            like
        }
        let message
        const reaction = await this.reactionDatabase.findReaction(reactionDB)
        if (reaction) {
            console.log(reaction.like, like)
            if (reaction.like == like) {//neutro
                like ? post.setLikes(-1) : post.setDislikes(-1)
                const toEdit = {
                    likes: post.getLikes(),
                    dislikes: post.getDislikes()
                }
                await this.reactionDatabase.deleteReaction(reactionDB)
                await this.postDatabase.editPostbyId(post.getId(), toEdit)
                message = `O usuario desfez o ${likeStr}`

            } else {//inverte reação
                if (like) {
                    post.setDislikes(-1)
                    post.setLikes(1)
                } else {
                    post.setDislikes(1)
                    post.setLikes(-1)
                }
                const toEdit = {
                    likes: post.getLikes(),
                    dislikes: post.getDislikes()
                }
                await this.reactionDatabase.editReaction(reactionDB)
                await this.postDatabase.editPostbyId(post.getId(), toEdit)
                message = `O usuario trocou para ${likeStr}`
            }
        } else {
            like ? post.setLikes(1) : post.setDislikes(1)
            const toEdit = {
                likes: post.getLikes(),
                dislikes: post.getDislikes()
            }
            await this.reactionDatabase.newReaction(reactionDB)
            await this.postDatabase.editPostbyId(post.getId(), toEdit)
            message = `O usuario deu ${likeStr} no video`
        }
        return { message }



    }
}