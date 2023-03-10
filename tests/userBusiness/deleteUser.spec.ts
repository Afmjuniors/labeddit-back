import {UserBusiness} from "../../src/Business/UserBusiness"
import {  DeleteUserInputDTO, DeleteUserOutputDTO, UserDTO } from "../../src/dto/UserDTO"
import { UserDatabaseMock } from "../moks/database/UserDatabaseMock"
import { HashManagerMock } from "../moks/service/HashManagerMock"
import { IdGeneratorMock } from "../moks/service/IdGeneretorMock"
import { TokenManagerMock } from "../moks/service/TokenManagerMock"

describe("Delete user",()=>{
    const userBusinnes = new UserBusiness(
        new UserDTO(),
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )
    const input:DeleteUserInputDTO = {
        id:"id-mock",
        token:"token-mock-normal"
    }
    test("Deve deletar um usuario", async()=>{
        const output : DeleteUserOutputDTO = await userBusinnes.deleteUser(input)
        
        
        expect(output.message).toBe("Usuario deletado com sucesso")
    })
})