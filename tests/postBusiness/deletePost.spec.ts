import {  DeletePostInputDTO, DeletePostOutputDTO, PostsDTO} from "../../src/dto/PostDTO"
import { CommentDatabaseMock } from "../moks/database/CommentDatabaseMock"
import { PostDatabaseMock } from "../moks/database/PostDatabaseMock"
import { ReactionDatabaseMock } from "../moks/database/ReactionDatabaseMock"
import { UserDatabaseMock } from "../moks/database/UserDatabaseMock"
import { IdGeneratorMock } from "../moks/service/IdGeneretorMock"
import { TokenManagerMock } from "../moks/service/TokenManagerMock"
import {PostBusiness} from"../../src/Business/PostBusiness"
import { BadRequestError } from "../../src/error/BadRequestError"
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
    
    
    test("Deve deletar um post", async ()=>{
        const input : DeletePostInputDTO ={
            id:"id-mock-p2",
            token:"token-mock-normal"
        }

        const output  = await  postBusiness.deletePost(input)
        expect(output.message).toBe("Post deletado com sucesso")
    })
    test("must throw error when token is invalid", async ()=>{
        const input : DeletePostInputDTO ={
            id:"id-mock-c",
            token:"token-mock-error"
        }
        expect.assertions(1)
        try {
           await  postBusiness.deletePost(input)
        } catch (error) {
            if(error instanceof BadRequestError){
            expect(error.message).toBe("Usuario não logado")
            }
        }        
       
    })
})