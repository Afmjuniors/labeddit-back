import {UserBusiness} from "../../src/Business/UserBusiness"
import { UserDTO } from "../../src/dto/UserDTO"
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

    test("",()=>{

    })
})