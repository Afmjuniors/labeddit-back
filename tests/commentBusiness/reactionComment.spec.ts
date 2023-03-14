import { CommentDatabaseMock } from "../moks/database/CommentDatabaseMock"
import { PostDatabaseMock } from "../moks/database/PostDatabaseMock"
import { UserDatabaseMock } from "../moks/database/UserDatabaseMock"
import { IdGeneratorMock } from "../moks/service/IdGeneretorMock"
import { TokenManagerMock } from "../moks/service/TokenManagerMock"
import {CommentBusiness} from"../../src/Business/CommentBusiness"
import { CommentsDTO, CreateCommentInputDTO, CommentsOutputDTO, DeleteCommentInputDTO, CommentReactionInputDTO } from "../../src/dto/CommentDTO"
import { ReactionCommentDatabaseMock } from "../moks/database/ReactionCommentDatabaseMock"
import { BadRequestError } from "../../src/error/BadRequestError"
import { NotFoundError } from "../../src/error/NotFoundError"
describe("Reaction to a comment", ()=>{
    const commentBusiness  = new CommentBusiness(
           new CommentsDTO(),
           new CommentDatabaseMock(),
           new UserDatabaseMock(),
           new PostDatabaseMock(),
           new ReactionCommentDatabaseMock(),
           new IdGeneratorMock(),
           new TokenManagerMock()
)
    
    
    test("Deve criar uma reaction inversa no comment", async ()=>{
        const input : CommentReactionInputDTO ={
            like:false,
            idComment:"id-mock-c",
            token:"token-mock-normal"
        }

        const output  = await  commentBusiness.reactionComment(input)
        expect(output.message).toBe( `O usuario trocou para dislike`)

    })
    test("Deve  tirar reaction  no comment", async ()=>{
        const input : CommentReactionInputDTO ={
            like:true,
            idComment:"id-mock-c",
            token:"token-mock-normal"
        }

        const output  = await  commentBusiness.reactionComment(input)
        expect(output.message).toBe(`O usuario desfez o like`)

    })
  
    test("must throw error when token is invalid", async ()=>{
        const input : CommentReactionInputDTO ={
            like:true,
            idComment:"id-mock-c",
            token:"token-mock-error"
        }
        expect.assertions(1)
        try {
           await  commentBusiness.reactionComment(input)
        } catch (error) {
            if(error instanceof BadRequestError){
            expect(error.message).toBe("Usuario não logado")
            }
        }        
       
    })
    test("must throw error when comment not found", async ()=>{
        const input : CommentReactionInputDTO ={
            like:true,
            idComment:"id-mock",
            token:"token-mock-normal"
        }
        expect.assertions(1)
        try {
           await  commentBusiness.reactionComment(input)
        } catch (error) {
            if(error instanceof NotFoundError){
            expect(error.message).toBe("Comment não encontrado")
            }
        }        
       
    })
})