import { BaseError } from "./BaseError";

export class DeniedAuthoError extends BaseError{
    constructor(
        message:string = "Autoridade invalida"
    ){
        super(403,message)
    }
}