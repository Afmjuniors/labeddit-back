import { BadRequestError } from "../error/BadRequestError"
import { Comment } from "../models/Comment"
import { CreatePostInputDTO } from "./PostDTO"

export interface CommentsOutputDTO {
    id: string,
    postId: string,
    content: string,
    likes: number,
    dislikes: number,
    createdAt: string,
    updatedAt: string,
    creator: {
        id: string,
        name: string,
    }
    userReaction:[boolean | undefined]

}

export interface GetCommentsInputDTO {
    postId: string,
    token: string
}

export interface CreateCommentInputDTO {
    content: string,
    postId: string
    token: string
}
export interface EditCommentInputDTO{
    content:string,
    token:string,
    id:string
}
export interface DeleteCommentInputDTO {
    id: string,
    token: string
}
export interface DeleteCommentOutputDTO {
    message: string
}

export interface CreateCommentOutputDTO {
    message: string,
    comment: CommentsOutputDTO
}

export interface CommentReactionInputDTO {
    like: boolean,
    idComment: string,
    token: string
}


export interface CommentReactionOutputDTO {
    message: string
}




export class CommentsDTO {

    public GetCommentInputDTO = (
        token: unknown,
        postId: unknown
    ): GetCommentsInputDTO => {
        if (typeof token !== 'string') {
            throw new BadRequestError("'token' deve ser uma string")
        }

        if (typeof postId !== 'string') {
            throw new BadRequestError('postId deve ser uma id de um post')
        }


        const dto = {
            token,
            postId
        }
        return dto
    }
    public GetCommentOutputDTO = (comments: Comment[], reaction:boolean): CommentsOutputDTO[] => {
        const dto: CommentsOutputDTO[] = comments.map((comment) => comment.toCommentOutput(reaction))
        return dto
    }

    public CreateCommentInputDTO = (
        content: unknown,
        postId: unknown,
        token: unknown
    ): CreateCommentInputDTO => {
        if (typeof content !== 'string') { throw new BadRequestError('Content deve ser uma string') }
        if (typeof postId !== 'string') { throw new BadRequestError('PostId deve ser uma string') }
        if (typeof token !== 'string') { throw new BadRequestError('token invalida') }
        const dto: CreateCommentInputDTO = {
            content,
            postId,
            token
        }

        return dto

    }
    public CreateCommentOutputDTO = (comment: Comment): CreateCommentOutputDTO => {
        const dto: CreateCommentOutputDTO = {
            message: "Comment adicionado com sucesso",
            comment: comment.toCommentOutput(undefined)
        }
        return dto
    }

    public DeleteCommentInputDTO = (id: unknown, token: unknown): DeleteCommentInputDTO => {
        if (typeof id !== 'string') {
            throw new BadRequestError("'id' deve ser uma string")
        }
        if (typeof token !== 'string') {
            throw new BadRequestError("'token' deve ser uma string")
        }
        return {
            id,
            token
        }
    }
    public DeleteCommentOutputDTO = (): DeleteCommentOutputDTO => {
        return {
            message: "Comment deletado com sucesso"
        }
    }

    public EditCommentDTO = (
        content:unknown,
        token:unknown,
        id:unknown
    ): EditCommentInputDTO =>{
        if(typeof content !=="string"){
            throw new BadRequestError("content deve ser uma string")
        }
        if(typeof token !=="string"){
            throw new BadRequestError("token deve ser uma string")
        }
        if(typeof id !== "string"){
            throw new BadRequestError("Id deve ser uma string")
        }
        const dto = {
            content,
            token,
            id
        }
        return dto
    }


    public CommentReactionInputDTO = (
        like: unknown,
        idComment: unknown,
        token: unknown
    ): CommentReactionInputDTO => {

        if (typeof like !== 'boolean') {
            throw new BadRequestError("'like' deve ser um booleano")
        }
        if (typeof idComment !== 'string') {
            throw new BadRequestError("'idComment' deve ser uma string")
        }
        if (typeof token !== 'string') {
            throw new BadRequestError("'token' deve ser uma string")
        }
        const dto = {
            like,
            idComment,
            token
        }

        return dto
    }
    public CommentReactionOuputDTO = (message: string): CommentReactionOutputDTO => {
        return {
            message: message
        }
    }

}