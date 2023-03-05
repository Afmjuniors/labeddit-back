import { BaseDatabase } from "../../../src/database/BaseDatabase"
import { ReactionComment } from "../../../src/types"


export class ReactionCommentDatabase extends BaseDatabase{
    public static TABLE_REACTION_COMMENTS = 'likes_dislikes_comments'

    public newReaction =async (reaction:ReactionComment) => {

    }

    public findReaction = async (reaction:ReactionComment) : Promise<ReactionComment>=>{


        return reaction
    }

    public editReaction =async (reaction:ReactionComment): Promise<void> => {

    }

    public deleteReaction = async (reaction:ReactionComment) :Promise<void>=>{

    }

   
    
}