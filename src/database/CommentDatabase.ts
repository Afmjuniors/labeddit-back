import { CommentDB, CommentEditDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";
import { ReactionDatabase } from "./ReactionDatabase";

export class CommentDatabase extends BaseDatabase{
    public static TABLE_COMMENT ="comments"

    public getAllComments = async ():Promise<CommentDB[]> =>{
        
        return await BaseDatabase.connection(CommentDatabase.TABLE_COMMENT)
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