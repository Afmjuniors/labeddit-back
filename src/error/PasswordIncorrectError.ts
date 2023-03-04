import { BaseError } from "./BaseError";

export class PasswordIncorrectError extends BaseError{
    constructor(
        message:string = "Senha Invalida"
    ){
        super(401,message)
    }
}