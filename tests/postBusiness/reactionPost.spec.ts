import {CreatePostInputDTO,  PostReactionInputDTO,  PostReactionOutputDTO,  PostsDTO} from "../../src/dto/PostDTO"
import { CommentDatabaseMock } from "../moks/database/CommentDatabaseMock"
import { PostDatabaseMock } from "../moks/database/PostDatabaseMock"
import { ReactionDatabaseMock } from "../moks/database/ReactionDatabaseMock"
import { UserDatabaseMock } from "../moks/database/UserDatabaseMock"
import { IdGeneratorMock } from "../moks/service/IdGeneretorMock"
import { TokenManagerMock } from "../moks/service/TokenManagerMock"
import {PostBusiness} from"../../src/Business/PostBusiness"
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
    
    
    test("Deve reagir ha um post", async ()=>{
        const input :PostReactionInputDTO ={
            like:true,
            idPost:"id-mock-p2",
            token:"token-mock-normal"
        }
        const likeStr = input.like ? "like" : "dislike"
        const outputExpected:PostReactionOutputDTO= {
            // message : `O usuario desfez o ${likeStr}`
            message : `O usuario trocou para ${likeStr}`            
            // message:`O usuario deu ${likeStr} no video`
        }
        const output  = await  postBusiness.reactionPost(input)
        expect(output).toEqual(outputExpected)
    })
})