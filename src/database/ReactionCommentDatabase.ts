import {  ReactionComment } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class ReactionCommentDatabase extends BaseDatabase{
    public static TABLE_REACTION_COMMENTS = 'likes_dislikes_comments'

    public newReaction =async (reaction:ReactionComment) => {
        await BaseDatabase
        .connection(ReactionCommentDatabase.TABLE_REACTION_COMMENTS)
        .insert(reaction)
    }

    public findReaction = async (reaction:ReactionComment) : Promise<ReactionComment>=>{
        const [reactioPost] : ReactionComment[]= await  BaseDatabase
        .connection(ReactionCommentDatabase.TABLE_REACTION_COMMENTS)
        .where({user_id:reaction.user_id})
        .andWhere({comment_id:reaction.comment_id})

        return reactioPost
    }

    public editReaction =async (reaction:ReactionComment): Promise<void> => {
        await BaseDatabase
        .connection(ReactionCommentDatabase.TABLE_REACTION_COMMENTS)
        .update({like:reaction.like})
        .where({user_id:reaction.user_id})
        .andWhere({comment_id:reaction.comment_id})
    }

    public deleteReaction = async (reaction:ReactionComment) :Promise<void>=>{
        await BaseDatabase
        .connection(ReactionCommentDatabase.TABLE_REACTION_COMMENTS)
        .del()
        .where({user_id:reaction.user_id})
        .andWhere({post_id:reaction.comment_id})
    }

   
    
}