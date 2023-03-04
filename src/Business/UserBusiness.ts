import { nowDate, regexEmail, regexPassword } from "../constants/patterns";
import { UserDatabase } from "../database/UserDatabase";
import { DeletePostInputDTO } from "../dto/PostDTO";
import { CreateUserInputDTO, CreateUserOutputDTO,  DeleteUserInputDTO,  DeleteUserOutputDTO,  EditUserInputDTO,  EditUserOutputDTO,  LoginUserInputDTO, LoginUserOutputDTO, UserDTO } from "../dto/UserDTO";
import { BadRequestError } from "../error/BadRequestError";
import { DeniedAuthoError } from "../error/DeniedAuthoError";
import { NotFoundError } from "../error/NoTFoundError";
import { NotUniqueValueError } from "../error/NotUniqueValueError";
import { PasswordIncorrectError } from "../error/PasswordIncorrectError";
import { User } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager, TokenPayload } from "../services/TokenManager";
import { Roles } from "../types";

export class UserBusiness{
    constructor(
      private userDTO: UserDTO,
      private userDatabase: UserDatabase,
      private idGenerator:IdGenerator,
      private tokenManager:TokenManager,
      private hashManager: HashManager
    ){}


    public createUser = async(input:CreateUserInputDTO ): Promise<CreateUserOutputDTO>=> {
        const {name,email,password} = input
       
        if(name.length<3){
            throw new BadRequestError("'name' deve ter pelo menos 3 caracteres");
            
        }
        if(!email.match(regexEmail)){
            throw new BadRequestError("Email invalido");

        }
        const userVerification = await this.userDatabase.getUserByEmail(email)
        if(userVerification){
            throw new NotUniqueValueError("Email ja cadastrado");            
        }
        if(!password.match(regexPassword)){
            throw new BadRequestError("Password teve conter pelo menos 1 letra Maiuscula, 1 letra minuscula, 1 caracter especial, 1 numero e ter de 8 a 12 caracteres");

        }
        const hashedPassword = await this.hashManager.hash(password)
        const id = this.idGenerator.generate()
        const newUser = new User
        (
            id,
            name,
            email,
            hashedPassword,
            Roles.NORMAL,
            nowDate,
            nowDate
        )
        await this.userDatabase.insertUser(newUser.ToDatabase())

        const payload: TokenPayload= newUser.ToPayload()

        const token =this.tokenManager.createToken(payload)
        
        const output = this.userDTO.CreateUserOutputDTO(newUser,token)
        return output        
    }

    public loginUser =async (input:LoginUserInputDTO): Promise<LoginUserOutputDTO> => {
        const {email,password} = input

        const user = await this.userDatabase.getUserByEmail(email)
        if(!user){
            throw new NotFoundError("Usuario não encontrado")
        }
        const isPassword =await this.hashManager.compare(password,user.password)
        
        if(!isPassword){
            throw new PasswordIncorrectError("Senha ou email Incorreto")
        }
       
        const userLogado = new User(
            user.id,
            user.name,
            user.email,
            user.password,
            user.role,
            user.created_at,
            user.updated_at
        )

        const payload: TokenPayload= userLogado.ToPayload()
        
        const token =this.tokenManager.createToken(payload)

        const output = this.userDTO.LoginUserOutputDTO(userLogado,token)
        return output

                
    }

    public editUser = async (input:EditUserInputDTO):Promise<EditUserOutputDTO>=>{
        const {id,email, password,role,token} = input

        const payload = this.tokenManager.getPyaload(token)
        if(payload === null){
            throw new BadRequestError("Token invalido")
        }
        if(id){

            if(payload.role !== Roles.ADMIN){
                if(payload.id!==id){
                    throw new DeniedAuthoError("Usuarios 'NORMAL' so pode editar a si mesmo")
                }
            }
        }
        
        if(role && payload.role !== Roles.ADMIN){
            throw new DeniedAuthoError("Usuario precisa ser ADMIN para trocar o role de um usuario")
        }
        if(password!==undefined){
            if(!password.match(regexPassword)){
                throw new BadRequestError("Password teve conter pelo menos 1 letra Maiuscula, 1 letra minuscula, 1 caracter especial, 1 numero e ter de 8 a 12 caracteres");
            }
            if(payload.id!==id){
                throw new DeniedAuthoError("Apenas o proprio usuario pode editar seu password")
            }
        }
        const userDB = await this.userDatabase.getUserById(id||payload.id)
        console.log(userDB)

        if(userDB === undefined){
            throw new NotFoundError("usuario não encontrado")
        }
        const userEdit = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role,
            userDB.created_at,
            userDB.updated_at
        )
        if(password){
            const hashedPassword = await this.hashManager.hash(password)
            userEdit.setpassword(hashedPassword)
            userEdit.setUpdatedAt()
        }
        if(role){
            userEdit.setRole(role)
            userEdit.setUpdatedAt()

        }
        if(email){
            userEdit.setEmail(email)
            userEdit.setUpdatedAt()

        }
        const userToEditDB = userEdit.ToEditDatabase()
        
        await this.userDatabase.editUser(userEdit.getId(),userToEditDB)

        const output = this.userDTO.EditUserOutputDTO(userEdit)

        return output
 
    }

    public deleteUser = async (input:DeleteUserInputDTO):Promise<DeleteUserOutputDTO> => {
        const {id, token} = input
        const payload = this.tokenManager.getPyaload(token)
        if(payload === null){
            throw new BadRequestError("Token invalido")
        }
        if(id){
            if(payload.role!==Roles.ADMIN){
                if(payload.id!==id){
                    throw new DeniedAuthoError("Um usuario 'NORMAL' pode deletar somente si mesmo")
                }
            }
        }
        await this.userDatabase.deleteUser(id||payload.id)

        return this.userDTO.DeleteUserOutputDTO("Usuario deletado com sucesso")
    }
}