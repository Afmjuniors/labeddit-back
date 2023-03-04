import { BadRequestError } from "../error/BadRequestError";
import { User } from "../models/User";
import { Roles } from "../types";


// export interface GetUsersOutputDTO {
//     message: string,
//     users: {
//         id: string,
//         name: string,
//         email: string,
//         role: Roles,
//         createdAt: string,
//         updatedAt: string

//     }[]
// }


export interface CreateUserInputDTO {
    name: string,
    email: string,
    password: string
}
export interface CreateUserOutputDTO {
    message: string,
    user: {
        id: string,
        name: string,
        email: string,
        role: Roles,
        createdAt: string,
        updatedAt: string

    },
    token: string
}

export interface LoginUserInputDTO {
    email: string,
    password: string
}
export interface LoginUserOutputDTO {
    message: string,
    user: {
        id: string,
        name: string
    },
    token: string
}
export interface EditUserInputDTO{
    id?:string
    email?:string,
    password?:string,
    role?:Roles,
    token:string
}

export interface EditUserOutputDTO{
    message:string,
    user: {
        id: string,
        name: string,
        email: string,
        role: Roles,
        createdAt: string,
        updatedAt: string

    }

}
export interface DeleteUserInputDTO{
    id?:string,
    token:string
}
export interface DeleteUserOutputDTO{
    message:string
}



export class UserDTO {
    constructor() { }

    public CreateUserInputDTO = (
        name: unknown,
        email: unknown,
        password: unknown
    ): CreateUserInputDTO => {
        if (typeof name !== 'string') {
            throw new BadRequestError("'name' deve ser uma string");
        }
        if (typeof email !== 'string') {
            throw new BadRequestError("'email' deve ser uma string");
        }
        if (typeof password !== 'string') {
            throw new BadRequestError("'password' deve ser uma string");
        }
        const dto: CreateUserInputDTO = {
            name,
            email,
            password
        }
        return dto
    }

    public CreateUserOutputDTO = (user: User, token: string): CreateUserOutputDTO => {
        const dto: CreateUserOutputDTO = {
            message: "Usuario adicionado com sucesso",
            user: user.getUsersOutput(),
            token
        }
        return dto
    }

    public LoginUserInputDTO = (
        email: unknown,
        password: unknown
    ): LoginUserInputDTO => {
        if (typeof email !== 'string') {
            throw new BadRequestError("email deve ser uma string");

        }
        if (typeof password !== 'string') {
            throw new BadRequestError("Password deve ser uma string");

        }
        const dto: LoginUserInputDTO = {
            email,
            password
        }
        return dto
    }

    public LoginUserOutputDTO = (user: User, token: string): LoginUserOutputDTO => {
        const dto: LoginUserOutputDTO = {
            message: "Login feito com sucesso",
            user: {
                id: user.getId(),
                name: user.getName(),
            },
            token
        }
        return dto
    }

    public EditUserInputDTO = (
        id:unknown,
        email:unknown,
        password: unknown,
        role: unknown,
        token: unknown
    ):EditUserInputDTO => {
       
        if (id !== undefined) {
            if (typeof id !== 'string') {
                throw new BadRequestError("'id' deve ser um string")
            }
        }
        if (email !== undefined) {
            if (typeof email !== 'string') {
                throw new BadRequestError("'email' deve ser um string")
            }
        }
        if (password !== undefined) {
            if (typeof password !== 'string') {
                throw new BadRequestError("'password' deve ser um string")
            }
        }
        if (role !== undefined) {
            if (role !== Roles.ADMIN && role !== Roles.NORMAL) {
                throw new BadRequestError("'password' deve ser um string")
            }
        }
        if (typeof token !== 'string') {
            throw new BadRequestError("'password' deve ser um string")
        }
        const dto = {
            id,
            password,
            email,
            role,
            token
        }
        return dto
    }

    public EditUserOutputDTO = (user:User):EditUserOutputDTO=>{
        const dto = {
            message: "Usuario editado com sucesso",
            user: user.getUsersOutput(),
      
        }
        return dto
    }

    public DeleteUserInputDTO = (
        id:unknown,
        token:unknown
    ):DeleteUserInputDTO=>{
        if(id!==undefined){
            if(typeof id !== 'string'){
                throw new BadRequestError("'id' deve ser uma string ou undifenied")
            }
        }
     
        if(typeof token !== 'string'){
            throw new BadRequestError("Token deve estar preenchido")
        }
        const dto = {
            id,
            token
        }
        return dto
    }

    public DeleteUserOutputDTO = (message:string):DeleteUserOutputDTO=>{
        return{
            message
        }
    }


}