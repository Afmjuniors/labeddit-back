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
        if(reaction.user_id==="id-mock-a"){
            return undefined
        }
        return {
            user_id:reaction.user_id,
            post_id:reaction.post_id,
            like:true
        }
        // return undefined

    }
    public findReactionByUser = async (user_id:string) : Promise<Reaction[] | undefined>=>{
        return [{
            user_id,
            post_id:"id-mock-p1",
            like:true
        }
    ]
    }

    public editReaction =async (reaction:Reaction): Promise<void> => {

    }

    public deleteReaction = async (reaction:Reaction) :Promise<void>=>{

    }

   
    
}