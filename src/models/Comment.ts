import { CommentsOutputDTO } from "../dto/CommentDTO"
import { CommentDB, Roles } from "../types"

export class Comment{
    constructor(
        private id:string,
        private content:string,
        private postId:string,
        private likes:number,
        private dislikes:number,
        private createdAt:string,
        private updatedAt:string,
        private creator:{
            id:string,
            name:string,
            role:Roles
        }
    ){}
    public getId():string{return this.id}
    public getPostId():string{return this.postId}
    
    public getContent():string{return this.content}
    public setContent(content:string):void{this.content=content}
    
    public getLikes():number{return this.likes}
    public setLikes(value:number):void{this.likes+=value}
    
    public getDislikes():number{return this.dislikes}
    public setDislikes(value:number):void{this.dislikes+=value}
    
    public getCreatedAt():string{return this.createdAt}
    public setCreatedAt(createdAt:string):void{this.createdAt=createdAt}
    
    public getUpdatedAt():string{return this.updatedAt}
    public setUpdatedAt(updatedAt:string):void{this.updatedAt=updatedAt}
    
    public getCreator():{id:string,name:string}{return this.creator}

    public toCommentDatabase (): CommentDB {
        return{
            id:this.id,
            creator_id:this.creator.id,
            post_id:this.postId,
            content:this.content,
            likes:this.likes,
            dislikes:this.dislikes,
            created_at:this.createdAt,
            updated_at:this.updatedAt
        }
    }
    public toCommentOutput (): CommentsOutputDTO{
        return{
            id:this.id,
            postId:this.postId,
            content:this.content,
            likes:this.likes,
            dislikes:this.dislikes,
            createdAt:this.createdAt,
            updatedAt:this.updatedAt,
            creator:{
                id:this.creator.id,
                name:this.creator.name
            }
        
        }
    }
    

}