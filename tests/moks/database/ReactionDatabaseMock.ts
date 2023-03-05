import { BaseDatabase } from "../../../src/database/BaseDatabase"
import { Reaction } from "../../../src/types"


export class ReactionDatabase extends BaseDatabase{
    public static TABLE_REACTION = "likes_dislikes"
    public static TABLE_REACTION_COMMENTS = 'likes_dislikes_comments'

    public newReaction =async (reaction:Reaction) => {

    }

    public findReaction = async (reaction:Reaction) : Promise<Reaction>=>{

        return reaction

    }

    public editReaction =async (reaction:Reaction): Promise<void> => {

    }

    public deleteReaction = async (reaction:Reaction) :Promise<void>=>{

    }

   
    
}