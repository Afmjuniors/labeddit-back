import {UserBusiness} from "../../src/Business/UserBusiness"
import {  LoginUserInputDTO, LoginUserOutputDTO, UserDTO } from "../../src/dto/UserDTO"
import { UserDatabaseMock } from "../moks/database/UserDatabaseMock"
import { HashManagerMock } from "../moks/service/HashManagerMock"
import { IdGeneratorMock } from "../moks/service/IdGeneretorMock"
import { TokenManagerMock } from "../moks/service/TokenManagerMock"

describe("Login",()=>{
    const userBusinnes = new UserBusiness(
        new UserDTO(),
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )
    const input:LoginUserInputDTO = {
        email:"adimn@mock.com",
        password:"senha"
    }
    test("Input e output do endpoint deve ser de acordo com DTO", async()=>{
        const output : LoginUserOutputDTO = await userBusinnes.loginUser(input)
        
        expect(output).toHaveProperty("message")
        expect(output).toHaveProperty("user")
        expect(output).toHaveProperty("token")
        
        expect(output.token).toBe("token-mock-admin")
    })
})