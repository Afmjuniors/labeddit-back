import { PostsDTO } from "../../src/dto/PostDTO"
import { BadRequestError } from "../../src/error/BadRequestError"

const postDTO = new PostsDTO()

describe("Testes de post DTO no createPost", ()=>{
    test("should throw error in case content isnt string", ()=>{
        expect.assertions(1)
                try {
                    const output  =  postDTO.CreatePostInputDTO(
                        null,
                       "token-mock-normal")
                    
                } catch (error) {
                    if(error instanceof BadRequestError){
                        expect(error.message).toBe("Content deve ser uma string")
                    }
                }
            })
            test("should throw error in case token is invalid", ()=>{
                expect.assertions(1)
                        try {
                            const output  =  postDTO.CreatePostInputDTO(
                                "New content in tests",
                               null)
                            
                        } catch (error) {
                            if(error instanceof BadRequestError){
                                expect(error.message).toBe("token invalida")
                            }
                        }
                    })
})
describe("Testes de post DTO no GetPostInputDTO", ()=>{
    test("should trwoh error in case id isnt string", ()=>{
        expect.assertions(1)
                try {
                    const output  =  postDTO.GetPostInputDTO(
                        "New content in tests",
                       1)
                    
                } catch (error) {
                    if(error instanceof BadRequestError){
                        expect(error.message).toBe('user deve ser uma id de um usuario ou undefined')
                    }
                }
            })
    test("should throw error in case token isnt string", ()=>{
        expect.assertions(1)
                try {
                    const output  =  postDTO.GetPostInputDTO(
                       null,
                       "moke-id")
                    
                } catch (error) {
                    if(error instanceof BadRequestError){
                        expect(error.message).toBe("'token' deve ser uma string")
                    }
                }
            })

})
describe("Testes de post DTO no DeletePostInputDTO", ()=>{
    test("should trwoh error in case id isnt string", ()=>{
        expect.assertions(1)
                try {
                    const output  =  postDTO.DeletePostInputDTO(
                        null,
                        "token-mock-normal")
                    
                } catch (error) {
                    if(error instanceof BadRequestError){
                        expect(error.message).toBe("'id' deve ser uma string")
                    }
                }
            })
    test("should throw error in case token isnt string", ()=>{
        expect.assertions(1)
                try {
                    const output  =  postDTO.DeletePostInputDTO(
                        "moke-id",
                       null)
                    
                } catch (error) {
                    if(error instanceof BadRequestError){
                        expect(error.message).toBe("'token' deve ser uma string")
                    }
                }
            })

})
describe("Testes de post DTO no PostReactionInputDTO", ()=>{
    test("should throw error in case like isnt boolean", ()=>{
        expect.assertions(1)
                try {
                    const output  =  postDTO.PostReactionInputDTO(
                        null,
                        "moke-id",
                        "token-mock-normal")
                    
                } catch (error) {
                    if(error instanceof BadRequestError){
                        expect(error.message).toBe("'like' deve ser um booleano")
                    }
                }
            })
            test("should trwoh error in case token isnt string", ()=>{
                expect.assertions(1)
                        try {
                            const output  =  postDTO.PostReactionInputDTO(
                                true,
                                null,
                                "token-mock-normal")
                            
                        } catch (error) {
                            if(error instanceof BadRequestError){
                                expect(error.message).toBe("'idPost' deve ser uma string")
                            }
                        }
                    })
                    test("should trwoh error in case token isnt string", ()=>{
                        expect.assertions(1)
                                try {
                                    const output  =  postDTO.PostReactionInputDTO(
                                        true,
                                        "moke-id",
                                        null)
                                    
                                } catch (error) {
                                    if(error instanceof BadRequestError){
                                        expect(error.message).toBe("'token' deve ser uma string")
                                    }
                                }
                            })
})
