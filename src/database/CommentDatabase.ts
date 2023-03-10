import { BadRequestError } from "../error/BadRequestError";
import { NotFoundError } from "../error/NoTFoundError";
import { CommentDB, CommentEditDB, PostDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";
import { PostDatabase } from "./PostDatabase";
import { ReactionDatabase } from "./ReactionDatabase";

export class CommentDatabase extends BaseDatabase{
    public static TABLE_COMMENT ="comments"

    public getAllComments = async (id:string):Promise<CommentDB[]> =>{
        
        return await BaseDatabase.connection(CommentDatabase.TABLE_COMMENT)
        .where({post_id:id})
    }
    public getCommentByUserId =async (idUser:string) :Promise<CommentDB[]>=> {

        return await BaseDatabase
        .connection(CommentDatabase.TABLE_COMMENT)
        .where({creator_id:idUser})
        
    }
    public getCommentById = async (id:string):Promise<CommentDB| undefined> =>{        
        const [comment] = await BaseDatabase
        .connection(CommentDatabase.TABLE_COMMENT)
        .where({id})
        return comment
    }
    public handleCommentsChange = async(id:string,value:number):Promise<void> =>{
  
    const comment = await this.getCommentById(id)

     if(comment===undefined){
        throw new NotFoundError("Comment n encontrado")
     }

     const [post] :PostDB[] =  await BaseDatabase
     .connection(PostDatabase.TABLE_POST)
     .where({id:comment.post_id})
    const number = post.comments+value
    await BaseDatabase
     .connection(PostDatabase.TABLE_POST)
     .update({comments:number})
     .where({id:comment.post_id})
    }
    public insertComment =async (comment:CommentDB):Promise<void> => {
        await BaseDatabase
        .connection(CommentDatabase.TABLE_COMMENT)
        .insert(comment)
    }

    public editCommentbyId =async (id:string, toEdit:CommentEditDB):Promise<void>=> {
        await BaseDatabase
        .connection(CommentDatabase.TABLE_COMMENT)
        .update(toEdit)
        .where({id})
    }
    public deleteCommentById =async (id:string):Promise<void> => {
        await BaseDatabase
        .connection(ReactionDatabase.TABLE_REACTION_COMMENTS)
        .del()
        .where({comment_id:id})
        await BaseDatabase
        .connection(CommentDatabase.TABLE_COMMENT)
        .del()
        .where({id})
      
    }
}