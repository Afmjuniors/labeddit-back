import { CommentDatabaseMock } from "../moks/database/CommentDatabaseMock"
import { PostDatabaseMock } from "../moks/database/PostDatabaseMock"
import { UserDatabaseMock } from "../moks/database/UserDatabaseMock"
import { IdGeneratorMock } from "../moks/service/IdGeneretorMock"
import { TokenManagerMock } from "../moks/service/TokenManagerMock"
import { CommentBusiness } from "../../src/Business/CommentBusiness"
import { CommentsDTO, EditCommentInputDTO} from "../../src/dto/CommentDTO"
import { ReactionCommentDatabaseMock } from "../moks/database/ReactionCommentDatabaseMock"
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
})