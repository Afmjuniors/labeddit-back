import express from "express"
import { CommentBusiness } from "../Business/CommentBusiness"
import { PostBusiness } from "../Business/PostBusiness"
import { UserBusiness } from "../Business/UserBusiness"
import { CommentsController } from "../controller/CommentsController"
import { PostController } from "../controller/PostController"
import { UserControler } from "../controller/UserController"
import { CommentDatabase } from "../database/CommentDatabase"
import { PostDatabase } from "../database/PostDatabase"
import { ReactionCommentDatabase } from "../database/ReactionCommentDatabase"
import { ReactionDatabase } from "../database/ReactionDatabase"
import { UserDatabase } from "../database/UserDatabase"
import { CommentsDTO } from "../dto/CommentDTO"
import { PostsDTO } from "../dto/PostDTO"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"

export const commentsRouter = express.Router()

// const postsDTO = new PostsDTO()

const commentsController = new CommentsController(
    new CommentsDTO(),
    new CommentBusiness(
        new CommentsDTO(),
        new CommentDatabase(),
        new UserDatabase(),
        new PostDatabase(),
        new ReactionCommentDatabase(),
        new IdGenerator(),
        new TokenManager()
    )

)
// const postControllet = new PostController( 
//     postsDTO,
//     new PostBusiness(
//         postsDTO,
//         new PostDatabase(),
//         new UserDatabase(),
//         new ReactionDatabase(),
//         new IdGenerator(),
//         new TokenManager()
//     )
// )

commentsRouter.get('/', commentsController.getComments)
commentsRouter.post('/', commentsController.createComment)

commentsRouter.put('/:id/reaction', commentsController.reactionComment) //reaction

commentsRouter.patch('/:id', commentsController.editComment)


commentsRouter.delete('/:id', commentsController.deleteComment)
