import { CommentsOutputDTO } from "../dto/CommentDTO"
import { PostOutputDTO, PostsOutput} from "../dto/PostDTO"
import { PostDB, Roles } from "../types"

export class Post{
    constructor(
        private id:string,
        private content:string,
        private likes:number,
        private dislikes:number,
        private comments:number,
        private createdAt:string,
        private updatedAt:string,
        private creator:{
            id:string,
            name:string,
            role:Roles
        }
    ){}
    public getId():string{return this.id}
    
    public getContent():string{return this.content}
    public setContent(content:string):void{this.content=content}
    
    public getLikes():number{return this.likes}
    public setLikes(value:number):void{this.likes+=value}

    public getComments():number{return this.comments}
    public setComments(value:number):void{this.comments+=value}
    
    public getDislikes():number{return this.dislikes}
    public setDislikes(value:number):void{this.dislikes+=value}
    
    public getCreatedAt():string{return this.createdAt}
    public setCreatedAt(createdAt:string):void{this.createdAt=createdAt}
    
    public getUpdatedAt():string{return this.updatedAt}
    public setUpdatedAt(updatedAt:string):void{this.updatedAt=updatedAt}
    
    public getCreator():{id:string,name:string}{return this.creator}

    public toPostDatabase (): PostDB {
        return{
            id:this.id,
            creator_id:this.creator.id,
            content:this.content,
            likes:this.likes,
            dislikes:this.dislikes,
            comments:this.comments,
            created_at:this.createdAt,
            updated_at:this.updatedAt
        }
    }
    public toPostOutput (userLiked?:boolean):PostOutputDTO{
        return{
            id:this.id,
            content:this.content,
            likes:this.likes,
            dislikes:this.dislikes,
            comments:this.comments,
            creator:{
                id:this.creator.id,
                name:this.creator.name
            },
            userReaction:userLiked,
            createdAt:this.createdAt,
            updatedAt:this.updatedAt
        
        }
    }
    

}