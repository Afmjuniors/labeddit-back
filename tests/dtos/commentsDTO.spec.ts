import { CommentsDTO } from "../../src/dto/CommentDTO"
import { BadRequestError } from "../../src/error/BadRequestError"

const commentsDTO = new CommentsDTO()

describe("Testes de post DTO no CreateComment", ()=>{
    test("should throw error in case content isnt string", ()=>{
        expect.assertions(1)
                try {
                    const output  =  commentsDTO.CreateCommentInputDTO(
                        null,
                        "mock-id-p",
                       "token-mock-normal")
                    
                } catch (error) {
                    if(error instanceof BadRequestError){
                        expect(error.message).toBe("Content deve ser uma string")
                    }
                }
            })
            test("should throw error in case postId isnt string", ()=>{
                expect.assertions(1)
                        try {
                            const output  =  commentsDTO.CreateCommentInputDTO(
                                "New content in tests",
                                null,
                               "token-mock-normal")
                            
                        } catch (error) {
                            if(error instanceof BadRequestError){
                                expect(error.message).toBe('PostId deve ser uma string')
                            }
                        }
                    })
            test("should throw error in case token is invalid", ()=>{
                expect.assertions(1)
                        try {
                            const output  =  commentsDTO.CreateCommentInputDTO(
                                "New content in tests",
                                "mock-id-p",
                               null)
                            
                        } catch (error) {
                            if(error instanceof BadRequestError){
                                expect(error.message).toBe("token invalida")
                            }
                        }
                    })
})
describe("Testes de post DTO no GetPostInputDTO", ()=>{
    test("should trwoh error in case postId isnt string", ()=>{
        expect.assertions(1)
                try {
                    const output  =  commentsDTO.GetCommentInputDTO(
                        "New content in tests",
                       null)
                    
                } catch (error) {
                    if(error instanceof BadRequestError){
                        expect(error.message).toBe('postId deve ser uma id de um post')
                    }
                }
            })
    test("should throw error in case token isnt string", ()=>{
        expect.assertions(1)
                try {
                    const output  =  commentsDTO.GetCommentInputDTO(
                       null,
                       "moke-id-p")
                    
                } catch (error) {
                    if(error instanceof BadRequestError){
                        expect(error.message).toBe("'token' deve ser uma string")
                    }
                }
            })

})
describe("Testes de post DTO no DeleteCommentInputDTO", ()=>{
    test("should trwoh error in case id isnt string", ()=>{
        expect.assertions(1)
                try {
                    const output  =  commentsDTO.DeleteCommentInputDTO(
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
                    const output  =  commentsDTO.DeleteCommentInputDTO(
                        "moke-id-p",
                       null)
                    
                } catch (error) {
                    if(error instanceof BadRequestError){
                        expect(error.message).toBe("'token' deve ser uma string")
                    }
                }
            })

})
describe("Testes de post DTO no CommentReactionInputDTO", ()=>{
    test("should throw error in case like isnt boolean", ()=>{
        expect.assertions(1)
                try {
                    const output  =  commentsDTO.CommentReactionInputDTO(
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
                            const output  =  commentsDTO.CommentReactionInputDTO(
                                true,
                                null,
                                "token-mock-normal")
                            
                        } catch (error) {
                            if(error instanceof BadRequestError){
                                expect(error.message).toBe("'idComment' deve ser uma string")
                            }
                        }
                    })
                    test("should trwoh error in case token isnt string", ()=>{
                        expect.assertions(1)
                                try {
                                    const output  =  commentsDTO.CommentReactionInputDTO(
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
describe("Testes de post DTO no EditCommentDTO", ()=>{
    test("should throw error in case content isnt string", ()=>{
        expect.assertions(1)
                try {
                    const output  =  commentsDTO.EditCommentDTO(
                        null,
                        "mock-id-p",
                       "token-mock-normal")
                    
                } catch (error) {
                    if(error instanceof BadRequestError){
                        expect(error.message).toBe("content deve ser uma string")
                    }
                }
            })
            test("should throw error in case postId isnt string", ()=>{
                expect.assertions(1)
                        try {
                            const output  =  commentsDTO.EditCommentDTO(
                                "New content in tests",
                                null,
                               "mock-id")
                            
                        } catch (error) {
                            if(error instanceof BadRequestError){
                                expect(error.message).toBe("token deve ser uma string")
                            }
                        }
                    })
            test("should throw error in case token is invalid", ()=>{
                expect.assertions(1)
                        try {
                            const output  =  commentsDTO.EditCommentDTO(
                                "New content in tests",
                                "token-mock-normal",
                               null)
                            
                        } catch (error) {
                            if(error instanceof BadRequestError){
                                expect(error.message).toBe("Id deve ser uma string")
                            }
                        }
                    })
})
