import { CommentDatabaseMock } from "../moks/database/CommentDatabaseMock"
import { PostDatabaseMock } from "../moks/database/PostDatabaseMock"
import { UserDatabaseMock } from "../moks/database/UserDatabaseMock"
import { IdGeneratorMock } from "../moks/service/IdGeneretorMock"
import { TokenManagerMock } from "../moks/service/TokenManagerMock"
import { CommentBusiness } from "../../src/Business/CommentBusiness"
import { CommentsDTO, EditCommentInputDTO} from "../../src/dto/CommentDTO"
import { ReactionCommentDatabaseMock } from "../moks/database/ReactionCommentDatabaseMock"
import { BadRequestError } from "../../src/error/BadRequestError"
import { NotFoundError } from "../../src/error/NotFoundError"
describe("Edit Comment", () => {
    const commentBusiness = new CommentBusiness(
        new CommentsDTO(),
        new CommentDatabaseMock(),
        new UserDatabaseMock(),
        new PostDatabaseMock(),
        new ReactionCommentDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )


    test("Deve Editar um post", async () => {
        const input: EditCommentInputDTO = {
                content: "Comment content",
                token: "token-mock-normal",
                id: "id-mock-c"
        }

        const output = await commentBusiness.editComment(input)
        expect(output.message).toBe("Comment adicionado com sucesso")
    })
    test("must throw error when token is invalid", async ()=>{
        const input : EditCommentInputDTO ={
            content:"Content mock",
            id:"id-mock-c",
            token:"token-mock-error"
        }
        expect.assertions(1)
        try {
           await  commentBusiness.editComment(input)
        } catch (error) {
            if(error instanceof BadRequestError){
            expect(error.message).toBe("Token invalido")
            }
        }        
       
    })
    test("must throw error when post is not found", async ()=>{
        const input : EditCommentInputDTO ={
            content:"Content mock",
            id:"id-mock",
            token:"token-mock-normal"
        }
        expect.assertions(1)
        try {
           await  commentBusiness.editComment(input)
        } catch (error) {
            if(error instanceof NotFoundError){
            expect(error.message).toBe("Comment não encontrado")
            }
        }        
       
    })
})