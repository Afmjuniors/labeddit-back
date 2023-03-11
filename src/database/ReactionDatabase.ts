import { Reaction } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class ReactionDatabase extends BaseDatabase{
    public static TABLE_REACTION = "likes_dislikes"
    public static TABLE_REACTION_COMMENTS = 'likes_dislikes_comments'

    public newReaction =async (reaction:Reaction) => {
        await BaseDatabase
        .connection(ReactionDatabase.TABLE_REACTION)
        .insert(reaction)
    }

    public findReaction = async (reaction:Reaction) : Promise<Reaction | undefined>=>{
        const [reactioPost] : Reaction[]= await  BaseDatabase
        .connection(ReactionDatabase.TABLE_REACTION)
        .where({user_id:reaction.user_id})
        .andWhere({post_id:reaction.post_id})

        return reactioPost
    }
    
    public findReactionByUser = async (user_id:string) : Promise<Reaction[] | undefined>=>{
        const reactioPost : Reaction[]= await  BaseDatabase
        .connection(ReactionDatabase.TABLE_REACTION)
        .where({user_id})
        return reactioPost
    }

    public editReaction =async (reaction:Reaction): Promise<void> => {
        await BaseDatabase
        .connection(ReactionDatabase.TABLE_REACTION)
        .update({like:reaction.like})
        .where({user_id:reaction.user_id})
        .andWhere({post_id:reaction.post_id})
    }

    public deleteReaction = async (reaction:Reaction) :Promise<void>=>{
        await BaseDatabase
        .connection(ReactionDatabase.TABLE_REACTION)
        .del()
        .where({user_id:reaction.user_id})
        .andWhere({post_id:reaction.post_id})
    }

   
    
}