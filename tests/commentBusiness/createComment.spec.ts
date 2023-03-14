import { CommentDatabaseMock } from "../moks/database/CommentDatabaseMock"
import { PostDatabaseMock } from "../moks/database/PostDatabaseMock"
import { UserDatabaseMock } from "../moks/database/UserDatabaseMock"
import { IdGeneratorMock } from "../moks/service/IdGeneretorMock"
import { TokenManagerMock } from "../moks/service/TokenManagerMock"
import {CommentBusiness} from"../../src/Business/CommentBusiness"
import { CommentsDTO, CreateCommentInputDTO, CommentsOutputDTO } from "../../src/dto/CommentDTO"
import { ReactionCommentDatabaseMock } from "../moks/database/ReactionCommentDatabaseMock"
import { BadRequestError } from "../../src/error/BadRequestError"
import { NotFoundError } from "../../src/error/NotFoundError"
describe("Create new Comment", ()=>{
    const commentBusiness  = new CommentBusiness(
           new CommentsDTO(),
           new CommentDatabaseMock(),
           new UserDatabaseMock(),
           new PostDatabaseMock(),
           new ReactionCommentDatabaseMock(),
           new IdGeneratorMock(),
           new TokenManagerMock()
)
    
    
    test("Deve criar um comment", async ()=>{
        const input :CreateCommentInputDTO ={
            content:"OI",
            postId:"id-mock-p2",
            token:"token-mock-normal"
        }

        const outputExpected : CommentsOutputDTO= {
            id:"id-mock",
            postId:"id-mock-p2",
            content:"OI",
            likes:0,
            dislikes:0,
            createdAt:expect.any(String),
            updatedAt:expect.any(String),
            creator:{
                id:"id-mock",
                name:"user mock"
            },
            userReaction:[undefined]
        }
        const output  = await  commentBusiness.createComment(input)
        expect(output.comment).toEqual(outputExpected)
    })
    test("must throw error when token is invalid", async ()=>{
        const input : CreateCommentInputDTO ={
            content:"Content mock",
            postId:"id-mock-p2",
            token:"token-mock-error"
        }
        expect.assertions(1)
        try {
           await  commentBusiness.createComment(input)
        } catch (error) {
            if(error instanceof BadRequestError){
            expect(error.message).toBe("Usuario não logado")
            }
        }        
       
    })
    test("must throw error when post is not found", async ()=>{
        const input : CreateCommentInputDTO ={
            content:"Content mock",
            postId:"id-mock",
            token:"token-mock-normal"
        }
        expect.assertions(1)
        try {
           await  commentBusiness.createComment(input)
        } catch (error) {
            if(error instanceof NotFoundError){
            expect(error.message).toBe("Post não encontrado")
            }
        }        
       
    })
})