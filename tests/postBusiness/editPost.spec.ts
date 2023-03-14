import { CreatePostOutputDTO, EditPostInputDTO, PostsDTO} from "../../src/dto/PostDTO"
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
    
    
    test("Deve editar um post", async ()=>{
        const input : EditPostInputDTO ={
            data:{
                content:"Ola novamente",
                token:"token-mock-normal"
            },
            id:"id-mock-p2",
           
        }
        

        const output :CreatePostOutputDTO  = await  postBusiness.editPost(input)
        expect(output.message).toBe("Post adicionado com sucesso")
    })
    test("must throw error when token is invalid", async ()=>{
        const input : EditPostInputDTO ={
            data:{
                content:"Ola novamente",
                token:"token-mock-error"
            },
            id:"id-mock-p2",
           
        }
        expect.assertions(1)
        try {
           await  postBusiness.editPost(input)
        } catch (error) {
            if(error instanceof BadRequestError){
            expect(error.message).toBe("Token invalido")
            }
        }        
       
    })
    test("must throw error when post is not found", async ()=>{
        const input : EditPostInputDTO ={
            data:{
                content:"Ola novamente",
                token:"token-mock-error"
            },
            id:"id-mock",
           
        }
        expect.assertions(1)
        try {
           await  postBusiness.editPost(input)
        } catch (error) {
            if(error instanceof NotFoundError){
            expect(error.message).toBe("Post não encontrado")
            }
        }        
       
    })
})