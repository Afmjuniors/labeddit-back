import { BaseDatabase } from "../../../src/database/BaseDatabase"
import { Reaction } from "../../../src/types"


export class ReactionDatabaseMock extends BaseDatabase{
    public static TABLE_REACTION = "likes_dislikes"
    public static TABLE_REACTION_COMMENTS = 'likes_dislikes_comments'

    public newReaction =async (reaction:Reaction) => {

    }

    public findReaction = async (reaction:Reaction) : Promise<Reaction | undefined>=>{

        // return {
        //     user_id:reaction.user_id,
        //     post_id:reaction.post_id,
        //     like:reaction.like
        // }
        return {
            user_id:reaction.user_id,
            post_id:reaction.post_id,
            like:!reaction.like
        }
        // return undefined

    }

    public editReaction =async (reaction:Reaction): Promise<void> => {

    }

    public deleteReaction = async (reaction:Reaction) :Promise<void>=>{

    }

   
    
}