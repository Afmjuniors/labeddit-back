import {  DeletePostInputDTO, GetPostsInputDTO, PostOutputDTO, PostsDTO} from "../../src/dto/PostDTO"
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
    
    
    test("Deve criar um post", async ()=>{
        const input : GetPostsInputDTO ={
            token:"token-mock-normal"
        }
        const outputExpected: PostOutputDTO[] =
            [
                {
                  id: 'id-mock-p1',
                  content: 'Post mockado 1',
                  likes: 0,
                  dislikes: 0,
                  creator: { id: 'id-mock', name: 'user mock' },
                  comments: { count: 0, comments: [] },
                  createdAt: expect.any(String),
                  updatedAt: expect.any(String)
                },
                {
                  id: 'id-mock-p2',
                  content: 'Post mockado 2',
                  likes: 1,
                  dislikes: 0,
                  creator: { id: 'id-mock', name: 'user mock' },
                  comments: { count: 1, comments:  [
                    {
                      id: 'id-mock-c',
                      postId: 'id-mock-p2',
                      content: 'Mocked comment',
                      likes: 1,
                      dislikes: 0,
                      createdAt: expect.any(String),
                      updatedAt: expect.any(String),
                      creator: { id: 'id-mock', name: 'user mock' }
                    }
                  ]
             },
                  createdAt: expect.any(String),
                  updatedAt: expect.any(String)
                }
              ]
         
        

        const output  = await  postBusiness.getPosts(input)
        expect(output).toEqual(outputExpected)
    })
})