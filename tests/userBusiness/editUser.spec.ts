import {UserBusiness} from "../../src/Business/UserBusiness"
import {  EditUserInputDTO, EditUserOutputDTO,   UserDTO } from "../../src/dto/UserDTO"
import { UserDatabaseMock } from "../moks/database/UserDatabaseMock"
import { HashManagerMock } from "../moks/service/HashManagerMock"
import { IdGeneratorMock } from "../moks/service/IdGeneretorMock"
import { TokenManagerMock } from "../moks/service/TokenManagerMock"

describe("Edit user",()=>{
    const userBusinnes = new UserBusiness(
        new UserDTO(),
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )
    const input:EditUserInputDTO = {
        email:"adimn2@mock.com",
        token:"token-mock-normal"
    }
    test("Deve editar o usuario", async()=>{
        const output : EditUserOutputDTO = await userBusinnes.editUser(input)
        
        expect(output).toHaveProperty("message")
        expect(output).toHaveProperty("user")
        
        expect(output.message).toBe("Usuario editado com sucesso")
        expect(output.user.email).toBe("adimn2@mock.com")
    })
})