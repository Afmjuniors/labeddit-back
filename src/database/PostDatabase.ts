import { PostDB, PostEditDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";
import { ReactionDatabase } from "./ReactionDatabase";

export class PostDatabase extends BaseDatabase{
    public static TABLE_POST ="posts"

    public getAllPosts = async ():Promise<PostDB[]> =>{
        
        return await BaseDatabase.connection(PostDatabase.TABLE_POST)
    }
    public getPostByUserId =async (idUser:string) :Promise<PostDB[]>=> {

        return await BaseDatabase
        .connection(PostDatabase.TABLE_POST)
        .where({creator_id:idUser})
        
    }
    public getPostById = async (id:string):Promise<PostDB| undefined> =>{        
        const [post] = await BaseDatabase
        .connection(PostDatabase.TABLE_POST)
        .where({id})
        return post
    }
    public insertPost =async (post:PostDB):Promise<void> => {
        await BaseDatabase
        .connection(PostDatabase.TABLE_POST)
        .insert(post)
    }

    public editPostbyId =async (id:string, toEdit:PostEditDB):Promise<void>=> {
        await BaseDatabase
        .connection(PostDatabase.TABLE_POST)
        .update(toEdit)
        .where({id})
    }
    public deletePostById =async (id:string):Promise<void> => {
        await BaseDatabase
        .connection(ReactionDatabase.TABLE_REACTION)
        .del()
        .where({post_id:id})
        await BaseDatabase
        .connection(PostDatabase.TABLE_POST)
        .del()
        .where({id})
      
    }
}