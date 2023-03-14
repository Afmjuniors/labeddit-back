import { nowDate } from "../constants/patterns";
import { CommentDatabase } from "../database/CommentDatabase";
import { PostDatabase } from "../database/PostDatabase";
import { ReactionDatabase } from "../database/ReactionDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { CommentsOutputDTO } from "../dto/CommentDTO";
import { PostOutputDTO, PostsDTO, CreatePostOutputDTO, PostReactionOutputDTO, CreatePostInputDTO, DeletePostInputDTO, PostReactionInputDTO, GetPostsInputDTO } from "../dto/PostDTO";
import { BadRequestError } from "../error/BadRequestError";
import { NotFoundError } from "../error/NotFoundError";
import { Comment } from "../models/Comment";
import { Post } from "../models/Post";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { PostDB, PostEditDB, Reaction, Roles, TokenPayload } from "../types";

export class PostBusiness {
    constructor(
        private postDTO: PostsDTO,
        private postDatabase: PostDatabase,
        private userDatabase: UserDatabase,
        private reactionDatabase: ReactionDatabase,
        private commentDatabase: CommentDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) { }


    private getReaction = async (id:string, payload:TokenPayload) : Promise<boolean | undefined> =>{

        const toFind = {
            user_id:payload.id,
            post_id:id,
            like:true
        }
        const reactionUserInPost = await this.reactionDatabase.findReaction(toFind)

            return reactionUserInPost?.like
    }

    public getPosts = async (input: GetPostsInputDTO): Promise<PostOutputDTO[]> => {
        const { postId,token} = input

        const payload = this.tokenManager.getPayload(token)
        let postsDB =[]
        if (payload === null) {
            throw new BadRequestError("Usuario não logado")
        }
        if(postId){
            const pDB: PostDB | undefined = await this.postDatabase.getPostById(postId)
            if(pDB===undefined){
                throw new NotFoundError("Nenhum post encontrado")
            }
            postsDB.push(pDB)
        }else{
            const pDB: PostDB[] = await this.postDatabase.getAllPosts()
            postsDB =pDB
        }
       
   
        const users = await this.userDatabase.getAllUsers()
        const posts = postsDB.map( (post) => {
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
                post.comments,
                post.created_at,
                post.updated_at,
                user
            )
            return postInst

        })
        let output : PostOutputDTO[] = []
       for (let i of posts){
        const reaction = await this.getReaction(i.getId(),payload)
        const result = i.toPostOutput(reaction)
        output.push(result)
       }
      
        return output

    }

    public createPost = async (input: CreatePostInputDTO): Promise<CreatePostOutputDTO> => {

        const { content, token } = input
        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("Usuario não logado")
        }
        const post = new Post(
            this.idGenerator.generate(),
            content,
            0,
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
        const payload = this.tokenManager.getPayload(input.data.token)

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
            post.comments,
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
        const payload = this.tokenManager.getPayload(token)
        if (payload === null) {
            throw new BadRequestError("Usuario não logado")
        }

        if (payload.role !== Roles.ADMIN) {
        const post = await this.postDatabase.getPostById(id)
        if(!post){
            throw new NotFoundError("Post não encontrado")
        }
        const isPostByUser = post.creator_id===payload.id
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

        const payload = this.tokenManager.getPayload(token)

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
            postDB.comments,
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
            message = `O usuario deu ${likeStr} no post`
        }
        return { message }



    }
}