import { Request, Response } from "express";
import { PostBusiness } from "../Business/PostBusiness";
import { DeletePostInputDTO, PostsDTO } from "../dto/PostDTO";
import { BaseError } from "../error/BaseError";

export class PostController{
    constructor(
        private postDTO: PostsDTO,
        private postBusiness: PostBusiness
    ){}

    public getPosts = async (req:Request, res:Response)=>{
        try {
            const input = this.postDTO.GetPostInputDTO(
                req.headers.authorization,
                req.query.user)
           
            

            const output = await this.postBusiness.getPosts(input)

            res.status(200).send(output)
            
        } catch (error) {
            console.log(error)
        
            if (error instanceof BaseError) {
                res.status(500).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
  

    }
    public createPost =async (req:Request,res:Response) => {
        try {
            const input = this.postDTO.CreatePostInputDTO(req.body.content,req.headers.authorization)
            

            
            const output = await this.postBusiness.createPost(input)

            res.status(201).send(output)
            
        } catch (error) {
            console.log(error)
        
            if (error instanceof BaseError) {
                res.status(500).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
        
    }
    public editPost =async (req:Request,res:Response) => {
        try {
            const input = {
                data:this.postDTO.CreatePostInputDTO(req.body.content, req.headers.authorization),
                id: req.params.id
            }


            
            const output = await this.postBusiness.editPost(input)

            res.status(200).send(output)
            
        } catch (error) {
            console.log(error)
        
            if (error instanceof BaseError) {
                res.status(500).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
        
    }
    public deletePost = async (req:Request, res:Response)=>{
        try {
            const input:DeletePostInputDTO = this.postDTO.DeletePostInputDTO(
                req.params.id,
                req.headers.authorization
            )

            const output = await this.postBusiness.deletePost(input)

            res.status(200).send(output)
            
        } catch (error) {
            console.log(error)
        
            if (error instanceof BaseError) {
                res.status(500).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
  

    }
    public reactionPost = async (req:Request,res:Response)=>{
        try {

            const input = this.postDTO.PostReactionInputDTO(
                req.body.like,
                req.params.id,
                req.headers.authorization)
    
            const output = await this.postBusiness.reactionPost(input)

            res.status(200).send(output)
            
        } catch (error) {
            console.log(error)
        
            if (error instanceof BaseError) {
                res.status(500).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }

    }
}