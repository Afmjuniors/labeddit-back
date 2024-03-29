import {  DeletePostInputDTO, GetPostsInputDTO, PostOutputDTO, PostsDTO} from "../../src/dto/PostDTO"
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
    
    
    test("Deve pegar todos os posts", async ()=>{
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
                  comments:0,
                  createdAt: expect.any(String),
                  updatedAt: expect.any(String),
                  userReaction:[true]
                },
                {
                  id: 'id-mock-p2',
                  content: 'Post mockado 2',
                  likes: 1,
                  dislikes: 0,
                  creator: { id: 'id-mock', name: 'user mock' },
                  comments: 1,             
                  createdAt: expect.any(String),
                  updatedAt: expect.any(String),
                  userReaction:[true]
                }
              ]
         
        

        const output  = await  postBusiness.getPosts(input)
        expect(output).toEqual(outputExpected)
    })
    test("must throw error when token is invalid", async ()=>{
      const input : GetPostsInputDTO ={
          postId:"id-mock-p2",
          token:"token-mock-error"
      }
      expect.assertions(1)
      try {
         await  postBusiness.getPosts(input)
      } catch (error) {
          if(error instanceof BadRequestError){
          expect(error.message).toBe("Usuario não logado")
          }
      }        
     
  })
})