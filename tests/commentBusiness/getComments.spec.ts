import { CommentDatabaseMock } from "../moks/database/CommentDatabaseMock"
import { PostDatabaseMock } from "../moks/database/PostDatabaseMock"
import { UserDatabaseMock } from "../moks/database/UserDatabaseMock"
import { IdGeneratorMock } from "../moks/service/IdGeneretorMock"
import { TokenManagerMock } from "../moks/service/TokenManagerMock"
import {CommentBusiness} from"../../src/Business/CommentBusiness"
import { CommentsDTO, CreateCommentInputDTO, CommentsOutputDTO, DeleteCommentInputDTO, GetCommentsInputDTO } from "../../src/dto/CommentDTO"
import { ReactionCommentDatabaseMock } from "../moks/database/ReactionCommentDatabaseMock"
import { CommentDB } from "../../src/types"
import { BadRequestError } from "../../src/error/BadRequestError"
describe("Get Comments", ()=>{
    const commentBusiness  = new CommentBusiness(
           new CommentsDTO(),
           new CommentDatabaseMock(),
           new UserDatabaseMock(),
           new PostDatabaseMock(),
           new ReactionCommentDatabaseMock(),
           new IdGeneratorMock(),
           new TokenManagerMock()
)
    
    
    test("Deve voltar os comments", async ()=>{
        const input : GetCommentsInputDTO ={
            postId:"id-mock-p2",
            token:"token-mock-normal"
        }
        const expectCommentOutput: CommentsOutputDTO ={
            content: "Mocked comment",
            createdAt: expect.any(String),
            creator: {
                id: "id-mock",
                name: "user mock"
            }, 
            dislikes: 0,
            id: "id-mock-c",
            likes: 1, 
            postId: "id-mock-p2",
            updatedAt: expect.any(String),
            userReaction:[true]
        }
        const output  = await  commentBusiness.getComments(input)
        expect(output).toContainEqual(expectCommentOutput)
    })

    test("must throw error when token is invalid", async ()=>{
        const input : GetCommentsInputDTO ={
            postId:"id-mock-p2",
            token:"token-mock-error"
        }
        expect.assertions(1)
        try {
           await  commentBusiness.getComments(input)
        } catch (error) {
            if(error instanceof BadRequestError){
            expect(error.message).toBe("Usuario não logado")
            }
        }        
       
    })
})