import { BadRequestError } from "../error/BadRequestError"
import { Post } from "../models/Post"
import { CommentsOutputDTO } from "./CommentDTO"


export interface PostOutputDTO{
    id:string,
    content:string,
    likes:number,
    dislikes:number,
    comments:number,
    creator:{
        id:string,
        name:string,
    }
    userReaction?:boolean,
    createdAt:string,
    updatedAt:string,
}
export interface PostsOutput{
    id:string,
    content:string,
    likes:number,
    dislikes:number,
    comments:number,
    createdAt:string,
    updatedAt:string,
    creator:{
        id:string,
        name:string,
    }

}

export interface EditPostInputDTO{
    data:CreatePostInputDTO,
    id:string
}


export interface GetPostsInputDTO{
    user?:string,
    token:string 
}

export interface CreatePostInputDTO{
    content:string,
    token:string
}
export interface DeletePostInputDTO{
    id:string,
    token:string
}
export interface DeletePostOutputDTO{
    message:string
}

export interface CreatePostOutputDTO{
    message:string,
    post:PostOutputDTO
}

export interface PostReactionInputDTO{
    like:boolean,
    idPost:string,
    token:string
}


export interface PostReactionOutputDTO{
    message:string
}




export class PostsDTO{

    public GetPostInputDTO =(
        token:unknown,
        user?:unknown
    ): GetPostsInputDTO=>{
        if(typeof token !== 'string'){
            throw new BadRequestError("'token' deve ser uma string")
        }
        if(user!== undefined){
            if(typeof user !== 'string'){
                throw new BadRequestError('user deve ser uma id de um usuario ou undefined')
            }
        }

        const dto ={
            token,
            user
        }
        return dto
    }
    public GetPostOutputDTO = (posts:Post[], reaction:boolean): PostOutputDTO[] =>{
        const dto:PostOutputDTO[] = posts.map((post)=>post.toPostOutput(reaction))
        return dto
    }
    
    public CreatePostInputDTO = (
        content:unknown,
        token:unknown
        ):CreatePostInputDTO =>{ 
        if(typeof content!=='string')
        {throw new BadRequestError('Content deve ser uma string')}
        if(typeof token !== 'string')
        {throw new BadRequestError('token invalida')}
        const dto : CreatePostInputDTO ={
            content,
            token
        }

        return dto

    }
    public CreatePostOutputDTO = (post:Post):CreatePostOutputDTO =>{
        const dto :CreatePostOutputDTO= {
            message:"Post adicionado com sucesso",
            post: post.toPostOutput()
        }
        return dto
    }

    public DeletePostInputDTO = (id:unknown, token:unknown):DeletePostInputDTO=>{
        if(typeof id !== 'string'){
            throw new BadRequestError("'id' deve ser uma string")
        }
        if(typeof token !== 'string'){
            throw new BadRequestError("'token' deve ser uma string")
        }
        return {
            id,
            token
        }
    }
    public DeletePostOutputDTO=():DeletePostOutputDTO=>{
        return {
            message:"Post deletado com sucesso"
        }
    }


    public PostReactionInputDTO = (
        like:unknown,
        idPost:unknown,
        token:unknown
        ):PostReactionInputDTO =>{
      
           if(typeof like !== 'boolean'){
               throw new BadRequestError("'like' deve ser um booleano")
            }
            if(typeof idPost !== 'string'){
                throw new BadRequestError("'idPost' deve ser uma string")
             }
             if(typeof token !== 'string'){
                throw new BadRequestError("'token' deve ser uma string")
             }
             const dto = {
                like,
                idPost,
                token
             }

        return dto
    }
    public PostReactionOuputDTO = (message:string):PostReactionOutputDTO=>{
        return{
            message:message
        }
    }

}