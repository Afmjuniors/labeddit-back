import { UserDTO } from "../../src/dto/UserDTO"
import { BadRequestError } from "../../src/error/BadRequestError"
import { Roles } from "../../src/types"

const userDTO = new UserDTO()

describe("Testes de users DTO no CreateUserInputDTO", () => {
    test("should throw error in case name isnt string", () => {
        expect.assertions(1)
        try {
            const output = userDTO.CreateUserInputDTO(
                null,
                "email@email.com",
                "password1@Aa")

        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("'name' deve ser uma string")
            }
        }
    })
    test("should throw error in case email isnt string", () => {
        expect.assertions(1)
        try {
            const output = userDTO.CreateUserInputDTO(
                "alexadre",
                null,
                "password1@Aa")

        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("'email' deve ser uma string")
            }
        }
    })
    test("should throw error in case password isnt string", () => {
        expect.assertions(1)
        try {
            const output = userDTO.CreateUserInputDTO(
                "alexadre",
                "email@email.com",
                null)

        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("'password' deve ser uma string")
            }
        }
    })

})
describe("Testes de users DTO no LoginUserInputDTO", () => {

    test("should throw error in case email isnt string", () => {
        expect.assertions(1)
        try {
            const output = userDTO.LoginUserInputDTO(
                null,
                "password1@Aa")

        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("email deve ser uma string")
            }
        }
    })
    test("should throw error in case password isnt string", () => {
        expect.assertions(1)
        try {
            const output = userDTO.LoginUserInputDTO(
                "email@email.com",
                null)

        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("Password deve ser uma string")
            }
        }
    })

})
describe("Testes de users DTO no EditUserInputDTO", () => {

    test("should throw error in case id isnt string", () => {
        expect.assertions(1)
        try {
            const output = userDTO.EditUserInputDTO(
                1,
                "mock@email.com",
                "password1@Aa",
                Roles.NORMAL,
                "token-mock-normal"
                )

        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("'id' deve ser um string")
            }
        }
    })
    test("should throw error in case email isnt string", () => {
        expect.assertions(1)
        try {
            const output = userDTO.EditUserInputDTO(
                "moke-id",
                1,
                "password1@Aa",
                Roles.NORMAL,
                "token-mock-normal"
                )

        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("'email' deve ser um string")
            }
        }
    })
    test("should throw error in case password isnt string", () => {
        expect.assertions(1)
        try {
            const output = userDTO.EditUserInputDTO(
                "moke-id",
                "mock@email.com",
                1,
                Roles.NORMAL,
                "token-mock-normal"
                )

        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("'password' deve ser uma string")
            }
        }
    })
    test("should throw error in case role isnt in the ENUM", () => {
        expect.assertions(1)
        try {
            const output = userDTO.EditUserInputDTO(
                "moke-id",
                "mock@email.com",
                "password1@Aa",
                "mok-role",
                "token-mock-normal"
                )

        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("'role' deve ser um ADMIN ou NORMAL")
            }
        }
    })
    test("should throw error in case token isnt string", () => {
        expect.assertions(1)
        try {
            const output = userDTO.EditUserInputDTO(
                "moke-id",
                "mock@email.com",
                "password1@Aa",
                Roles.NORMAL,
                null
                )

        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("'token' deve ser um string")
            }
        }
    })


})
describe("Testes de users DTO no DeleteUserInputDTO", () => {

    test("should throw error in case id isnt string", () => {
        expect.assertions(1)
        try {
            const output = userDTO.DeleteUserInputDTO(
                null,
                "token-mok-normal")

        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("'id' deve ser uma string ou undifenied")
            }
        }
    })
    test("should throw error in case token isnt in the request", () => {
        expect.assertions(1)
        try {
            const output = userDTO.DeleteUserInputDTO(
                "mock-id",
                null)

        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("Token deve estar preenchido")
            }
        }
    })

})