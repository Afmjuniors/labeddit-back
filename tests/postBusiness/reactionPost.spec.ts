import {CreatePostInputDTO,  PostReactionInputDTO,  PostReactionOutputDTO,  PostsDTO} from "../../src/dto/PostDTO"
import { CommentDatabaseMock } from "../moks/database/CommentDatabaseMock"
import { PostDatabaseMock } from "../moks/database/PostDatabaseMock"
import { ReactionDatabaseMock } from "../moks/database/ReactionDatabaseMock"
import { UserDatabaseMock } from "../moks/database/UserDatabaseMock"
import { IdGeneratorMock } from "../moks/service/IdGeneretorMock"
import { TokenManagerMock } from "../moks/service/TokenManagerMock"
import {PostBusiness} from"../../src/Business/PostBusiness"
import { BadRequestError } from "../../src/error/BadRequestError"
import { NotFoundError } from "../../src/error/NotFoundError"
describe("Create new Post", ()=>{
    const postBusiness  = new PostBusiness(
           new PostsDTO(),
           new PostDatabaseMock(),
           new UserDatabaseMock(),
           new ReactionDatabaseMock(),
           new CommentDatabaseMock(),
           new IdGeneratorMock(),
           new TokenManagerMock()
)
    
    
    test("Deve tirar reação de um post", async ()=>{
        const input :PostReactionInputDTO ={
            like:true,
            idPost:"id-mock-p2",
            token:"token-mock-normal"
        }
        const outputExpected:PostReactionOutputDTO= {
            message : `O usuario desfez o like`            
        }
        const output  = await  postBusiness.reactionPost(input)
        expect(output).toEqual(outputExpected)
    })
    test("Deve reagir ha um post", async ()=>{
        const input :PostReactionInputDTO ={
            like:false,
            idPost:"id-mock-p2",
            token:"token-mock-normal"
        }
        const outputExpected:PostReactionOutputDTO= {
            message : "O usuario trocou para dislike"
        }
        const output  = await  postBusiness.reactionPost(input)
        expect(output).toEqual(outputExpected)
    })
    test("Deve reagir ha um post", async ()=>{
        const input :PostReactionInputDTO ={
            like:true,
            idPost:"id-mock-p2",
            token:"token-mock-admin"
        }
        const outputExpected:PostReactionOutputDTO= {
            message:`O usuario deu like no video`
        }
        const output  = await  postBusiness.reactionPost(input)
        expect(output).toEqual(outputExpected)
    })
    test("must throw error when token is invalid", async ()=>{
        const input : PostReactionInputDTO ={
            like:true,
            idPost:"id-mock-c",
            token:"token-mock-error"
        }
        expect.assertions(1)
        try {
           await  postBusiness.reactionPost(input)
        } catch (error) {
            if(error instanceof BadRequestError){
            expect(error.message).toBe("Usuario não logado")
            }
        }        
       
    })
    test("must throw error when comment not found", async ()=>{
        const input : PostReactionInputDTO ={
            like:true,
            idPost:"id-mock",
            token:"token-mock-normal"
        }
        expect.assertions(1)
        try {
           await  postBusiness.reactionPost(input)
        } catch (error) {
            if(error instanceof NotFoundError){
            expect(error.message).toBe("Post não encontrado")
            }
        }        
       
    })
})