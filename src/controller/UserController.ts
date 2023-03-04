import { Request, Response } from "express"
import { UserBusiness } from "../Business/UserBusiness"
import { DeleteUserOutputDTO, EditUserOutputDTO, UserDTO } from "../dto/UserDTO"
import { BaseError } from "../error/BaseError"

export class UserControler{
    constructor(
        private userDTO: UserDTO,
        private userBusiness:UserBusiness

    ){}

    public createUser = async (req:Request,res:Response) =>{
        try {
            const input = this.userDTO.CreateUserInputDTO(
                req.body.name,
                req.body.email,
                req.body.password
            )
        const output = await this.userBusiness.createUser(input)

        res.status(201).send(output)
            
        } catch (error) {
            console.log(error)
        
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }
    public loginUser =async (req:Request,res:Response) => {
        try {
            const input = this.userDTO.LoginUserInputDTO(
                req.body.email,
                req.body.password
            )
            const output = await this.userBusiness.loginUser(input)

            res.status(200).send(output)
            
        } catch (error) {
            console.log(error)
        
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            } 
        }
        
    }

    public editUser =async (req:Request, res:Response) => {
        try {
            const input = this.userDTO.EditUserInputDTO(
                req.query.id,
                req.body.email,
                req.body.password,
                req.body.role,
                req.headers.authorization
            )
            const output: EditUserOutputDTO = await this.userBusiness.editUser(input)
            res.status(200).send(output)
            
        } catch (error) {
            console.log(error)
        
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            } 
        }
    }

    public deleteUser =async (req:Request, res:Response) => {
        try {
            const input = this.userDTO.DeleteUserInputDTO(
                req.query.id,
                req.headers.authorization
            )
            const output : DeleteUserOutputDTO  = await this.userBusiness.deleteUser(input)
            res.status(200).send(output)
            
        } catch (error) {
            console.log(error)
        
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            } 
        }
    }
}

