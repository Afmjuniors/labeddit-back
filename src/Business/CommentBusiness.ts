import { nowDate } from "../constants/patterns";
import { CommentDatabase } from "../database/CommentDatabase";
import { PostDatabase } from "../database/PostDatabase";
import { ReactionCommentDatabase } from "../database/ReactionCommentDatabase";
import { ReactionDatabase } from "../database/ReactionDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { CommentsOutputDTO, CommentsDTO, CreateCommentOutputDTO, CommentReactionOutputDTO, CreateCommentInputDTO, DeleteCommentInputDTO, CommentReactionInputDTO, GetCommentsInputDTO } from "../dto/CommentDTO";
import { BadRequestError } from "../error/BadRequestError";
import { NotFoundError } from "../error/NoTFoundError";
import { Comment } from "../models/Comment";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { CommentDB, CommentEditDB, PostEditDB, Reaction, ReactionComment, Roles, TokenPayload } from "../types";

export class CommentBusiness {
    constructor(
        private commentDTO: CommentsDTO,
        private commentDatabase: CommentDatabase,
        private userDatabase: UserDatabase,
        private postDatabase: PostDatabase,
        private reactionCommentDatabase: ReactionCommentDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) { }

    public getComments = async (input: GetCommentsInputDTO): Promise<CommentsOutputDTO[]> => {
        const {postId, token} = input
        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("Usuario não logado")
        }

        const commentsDB: CommentDB[] = await this.commentDatabase.getAllComments(postId)

        const users = await this.userDatabase.getAllUsers()

        const comments = commentsDB.map((comment) => {
            const userFind = users.find((user) => user.id === comment.creator_id)
            if (!userFind) {
                throw new Error("Usuario não encontrado");
            }
            const user: TokenPayload = {
                id: userFind.id,
                name: userFind.name,
                role: userFind.role
            }
            const commentInst = new Comment(
                comment.id,
                comment.content,
                postId,
                comment.likes,
                comment.dislikes,
                comment.created_at,
                comment.updated_at,
                user
            )
            return commentInst

        })
        const output = this.commentDTO.GetCommentOutputDTO(comments)

        return output

    }

    public createComment = async (input: CreateCommentInputDTO): Promise<CreateCommentOutputDTO> => {

        const { content, token, postId } = input
        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("Usuario não logado")
        }

        const post  = await this.postDatabase.getPostById(postId)
        if(!post){
            throw new NotFoundError("Post não encontrado")
        }
        const newId =this.idGenerator.generate()
        const comment = new Comment(
            newId,
            content,
            postId,
            0,
            0,
            nowDate,
            nowDate,
            payload
        )
        const commentDB = comment.toCommentDatabase()
        await this.commentDatabase.insertComment(commentDB)

       await this.commentDatabase.handleCommentsChange(newId,1)

        return this.commentDTO.CreateCommentOutputDTO(comment)
    }

    public editComment = async (input: { data: CreateCommentInputDTO, id: string }): Promise<CreateCommentOutputDTO> => {

        const comment = await this.commentDatabase.getCommentById(input.id)
        if (!comment) {
            throw new NotFoundError("Comment não encontrado")
        }
        const user = await this.userDatabase.getUserById(comment.creator_id)
        if (!user) {
            throw new NotFoundError("Erro ao procurar Id do criador do comment")
        }
        const payload = this.tokenManager.getPayload(input.data.token)

        if (payload === null) {
            throw new BadRequestError("Token invalido")
        }
        if (payload.id !== user.id) {
            throw new BadRequestError("Apenas o criador pode editar o comment")

        }

        const commentEdited = new Comment(
            comment.id,
            comment.content,
            comment.post_id,
            comment.likes,
            comment.dislikes,
            comment.created_at,
            comment.updated_at,
            user)

        commentEdited.setContent(input.data.content)
        commentEdited.setUpdatedAt(nowDate)
        const toEdit: CommentEditDB = {
            content: commentEdited.getContent(),
            updated_at: commentEdited.getUpdatedAt()
        }

        await this.commentDatabase.editCommentbyId(commentEdited.getId(), toEdit)

        const output = this.commentDTO.CreateCommentOutputDTO(commentEdited)
        return output


    }

    public deleteComment = async (input: DeleteCommentInputDTO) => {

        const {token,id} = input

        const payload = this.tokenManager.getPayload(token)
        if (payload === null) {
            throw new BadRequestError("Usuario não logado")
        }

        if (payload.role !== Roles.ADMIN) {
        const commentsCreatedByUser = await this.commentDatabase.getCommentByUserId(payload.id)
        
        const isCommentByUser = commentsCreatedByUser.find((comment) => comment.id === id)
            
            if (!isCommentByUser) {
                throw new BadRequestError("Comment não foi criado pelo usuario")
            }
        }


        await this.commentDatabase.deleteCommentById(id)
        await this.commentDatabase.handleCommentsChange(id,-1)
        return this.commentDTO.DeleteCommentOutputDTO()
    }
    public reactionComment = async (input:CommentReactionInputDTO): Promise<CommentReactionOutputDTO> => {
        const {like,idComment,token} = input
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
        const commentDB = await this.commentDatabase.getCommentById(idComment)
        if (!commentDB) {
            throw new NotFoundError("Comment não encontrado")
        }
        const comment = new Comment(
            commentDB.id,
            commentDB.content,
            commentDB.post_id,
            commentDB.likes,
            commentDB.dislikes,
            commentDB.created_at,
            commentDB.updated_at,
            userOutput
        )

        const reactionDB: ReactionComment = {
            user_id: user.id,
            comment_id: idComment,
            like
        }
        let message
        const reaction = await this.reactionCommentDatabase.findReaction(reactionDB)
        if (reaction) {
            console.log(reaction.like, like)
            if (reaction.like == like) {//neutro
                like ? comment.setLikes(-1) : comment.setDislikes(-1)
                const toEdit = {
                    likes: comment.getLikes(),
                    dislikes: comment.getDislikes()
                }
                await this.reactionCommentDatabase.deleteReaction(reactionDB)
                await this.commentDatabase.editCommentbyId(comment.getId(), toEdit)
                message = `O usuario desfez o ${likeStr}`

            } else {//inverte reação
                if (like) {
                    comment.setDislikes(-1)
                    comment.setLikes(1)
                } else {
                    comment.setDislikes(1)
                    comment.setLikes(-1)
                }
                const toEdit = {
                    likes: comment.getLikes(),
                    dislikes: comment.getDislikes()
                }
                await this.reactionCommentDatabase.editReaction(reactionDB)
                await this.commentDatabase.editCommentbyId(comment.getId(), toEdit)
                message = `O usuario trocou para ${likeStr}`
            }
        } else {
            like ? comment.setLikes(1) : comment.setDislikes(1)
            const toEdit = {
                likes: comment.getLikes(),
                dislikes: comment.getDislikes()
            }
            await this.reactionCommentDatabase.newReaction(reactionDB)
            await this.commentDatabase.editCommentbyId(comment.getId(), toEdit)
            message = `O usuario deu ${likeStr} no video`
        }
        return { message }



    }
}