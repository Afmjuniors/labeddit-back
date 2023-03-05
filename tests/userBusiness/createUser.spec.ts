import {UserBusiness} from "../../src/Business/UserBusiness"
import { CreateUserInputDTO, CreateUserOutputDTO, UserDTO } from "../../src/dto/UserDTO"
import { UserDatabaseMock } from "../moks/database/UserDatabaseMock"
import { HashManagerMock } from "../moks/service/HashManagerMock"
import { IdGeneratorMock } from "../moks/service/IdGeneretorMock"
import { TokenManagerMock } from "../moks/service/TokenManagerMock"

describe("Create new user",()=>{
    const userBusinnes = new UserBusiness(
        new UserDTO(),
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )
    const userDatabase = new UserDatabaseMock()
    const input:CreateUserInputDTO = {
        name:"New User",
        email:"new@mock.com",
        password:"Senh@1234"
    }
    test("Input e output do endpoint deve ser de acordo com DTO", async()=>{
        const output : CreateUserOutputDTO = await userBusinnes.createUser(input)
        
        expect(output).toHaveProperty("message")
        expect(output).toHaveProperty("user")
        expect(output).toHaveProperty("token")
        
        expect(output.token).toBe("token-mock-normal")
    })
})