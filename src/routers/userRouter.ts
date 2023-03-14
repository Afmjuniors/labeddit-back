import express from "express"
import { UserBusiness } from "../Business/UserBusiness"
import { UserControler } from "../controller/UserController"
import { UserDatabase } from "../database/UserDatabase"
import { UserDTO } from "../dto/UserDTO"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"

export const userRouter = express.Router()

const userDTO = new UserDTO()

const userController = new UserControler(
    userDTO,
    new UserBusiness(
        userDTO,
        new UserDatabase(),
        new IdGenerator(),
        new TokenManager(),
        new HashManager()
    )
)

userRouter.patch('/', userController.editUser)
userRouter.delete('/', userController.deleteUser)
userRouter.post('/signup', userController.createUser)
userRouter.post('/login', userController.loginUser)
userRouter.get('/', userController.getAllusers)
