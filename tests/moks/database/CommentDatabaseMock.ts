import { nowDate } from "../../../src/constants/patterns"
import { BaseDatabase } from "../../../src/database/BaseDatabase"
import { CommentDB, CommentEditDB } from "../../../src/types"

export class CommentDatabaseMock extends BaseDatabase{
    public static TABLE_COMMENT ="comments"

    public getAllComments = async (id:string):Promise<CommentDB[]> =>{
        if(id==="id-mock-p2"){
            return [{
                id:"id-mock-c",
                creator_id:"id-mock",
                post_id:"id-mock-p2",
                content:"Mocked comment",
                likes:1,
                dislikes:0,
                created_at:nowDate,
                updated_at:nowDate
            }]
        }
        return []
    }
    public getCommentByUserId =async (idUser:string) :Promise<CommentDB[]>=> {

        if(idUser==="id-mock"){
            return [{
                id:"id-mock-c",
                creator_id:"id-mock",
                post_id:"id-mock-p2",
                content:"Mocked comment",
                likes:1,
                dislikes:0,
                created_at:nowDate,
                updated_at:nowDate
            }]
        }
        return []
        
    }
    public getCommentById = async (id:string):Promise<CommentDB| undefined> =>{        
        if(id==="id-mock-c"){
            return {
                id:"id-mock-c",
                creator_id:"id-mock",
                post_id:"id-mock-p2",
                content:"Mocked comment",
                likes:1,
                dislikes:0,
                created_at:nowDate,
                updated_at:nowDate
            }
        }
    }
    public handleCommentsChange = async(commentId:string,value:number):Promise<void> =>{
    
    }
    public insertComment =async (comment:CommentDB):Promise<void> => {

    }

    public editCommentbyId =async (id:string, toEdit:CommentEditDB):Promise<void>=> {

    }
    public deleteCommentById =async (id:string):Promise<void> => {

      
    }
}