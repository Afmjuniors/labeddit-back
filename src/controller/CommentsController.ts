import { Request, Response } from "express";
import { CommentBusiness } from "../Business/CommentBusiness";
import { DeleteCommentInputDTO, CommentsDTO } from "../dto/CommentDTO";
import { BaseError } from "../error/BaseError";

export class CommentsController{
    constructor(
        private commentDTO: CommentsDTO,
        private commentBusiness: CommentBusiness
    ){}

    public getComments = async (req:Request, res:Response)=>{
        try {
            const input = this.commentDTO.GetCommentInputDTO(
                req.headers.authorization,
                req.params.id)
           
            

            const output = await this.commentBusiness.getComments(input)

            res.status(200).send(output)
            
        } catch (error) {
            console.log(error)
        
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            } 
        }
  

    }
    public createComment =async (req:Request,res:Response) => {
        try {
            const input = this.commentDTO.CreateCommentInputDTO(
                req.body.content,
                req.params.id,
                req.headers.authorization)
            

            
            const output = await this.commentBusiness.createComment(input)

            res.status(201).send(output)
            
        } catch (error) {
            console.log(error)
        
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            } 
        }
        
    }
    public editComment =async (req:Request,res:Response) => {
        try {
            const input = 
                this.commentDTO.EditCommentDTO(
                    req.body.content,
                    req.headers.authorization,
                    req.params.id)
               
            


            
            const output = await this.commentBusiness.editComment(input)

            res.status(200).send(output)
            
        } catch (error) {
            console.log(error)
        
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            } 
        }
        
    }
    public deleteComment = async (req:Request, res:Response)=>{
        try {
            const input:DeleteCommentInputDTO = this.commentDTO.DeleteCommentInputDTO(
                req.params.id,
                req.headers.authorization
            )

            const output = await this.commentBusiness.deleteComment(input)

            res.status(200).send(output)
            
        } catch (error) {
            console.log(error)
        
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            } 
        }
  

    }
    public reactionComment = async (req:Request,res:Response)=>{
        try {

            const input = this.commentDTO.CommentReactionInputDTO(
                req.body.like,
                req.params.id,
                req.headers.authorization)
    
            const output = await this.commentBusiness.reactionComment(input)

            res.status(200).send(output)
            
        } catch (error) {
            console.log(error)
        
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            } 
        }

    }
}
