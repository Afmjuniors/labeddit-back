import { BaseError } from "./BaseError";

export class NotUniqueValueError extends BaseError{
    constructor(
        message:string = "Usuario ja registrado"
    ){
        super(429,message)
    }
}