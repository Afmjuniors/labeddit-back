import { CommentDatabaseMock } from "../moks/database/CommentDatabaseMock"
import { PostDatabaseMock } from "../moks/database/PostDatabaseMock"
import { UserDatabaseMock } from "../moks/database/UserDatabaseMock"
import { IdGeneratorMock } from "../moks/service/IdGeneretorMock"
import { TokenManagerMock } from "../moks/service/TokenManagerMock"
import {CommentBusiness} from"../../src/Business/CommentBusiness"
import { CommentsDTO, CreateCommentInputDTO, CommentsOutputDTO, DeleteCommentInputDTO } from "../../src/dto/CommentDTO"
import { ReactionCommentDatabaseMock } from "../moks/database/ReactionCommentDatabaseMock"
describe("Delete comment", ()=>{
    const commentBusiness  = new CommentBusiness(
           new CommentsDTO(),
           new CommentDatabaseMock(),
           new UserDatabaseMock(),
           new PostDatabaseMock(),
           new ReactionCommentDatabaseMock(),
           new IdGeneratorMock(),
           new TokenManagerMock()
)
    
    
    test("Deve deletar um comment", async ()=>{
        const input : DeleteCommentInputDTO ={
            id:"id-mock-c",
            token:"token-mock-normal"
        }

        const output  = await  commentBusiness.deleteComment(input)
        expect(output.message).toBe("Comment deletado com sucesso")
    })
})