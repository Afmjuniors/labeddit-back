import { nowDate } from "../constants/patterns";

import { Roles, TokenPayload, UserDB,  UserOutput, UserToEditDB } from "../types";



export class User {
    constructor(
        private id:string,
        private name:string,
        private email:string,
        private password:string,
        private role:Roles,
        private createdAt:string,
        private updatedAt:string
    ){} 

    public getId():string{return this.id}

    public getName():string{return this.name}
    public setName(name:string):void{this.name=name}

    public getEmail():string{return this.email}
    public setEmail(email:string):void{this.email=email}
    
    public getpassword():string{return this.password}
    public setpassword(password:string):void{this.password=password}
    
    public getRole():Roles{return this.role}
    public setRole(role:Roles):void{this.role=role}
    
    public getcreatedAt():string{return this.createdAt}
    
    public getUpdatedAt():string{return this.updatedAt}
    public setUpdatedAt():void{this.updatedAt=nowDate}

    public getUsersOutput():UserOutput{
        return {
        id:this.id,
        name:this.name,
        email:this.email,
        role:this.role,
        createdAt:this.createdAt,
        updatedAt:this.updatedAt
    }
}

public ToDatabase():UserDB{
    return{
        id:this.id,
        name:this.name,
        email:this.email,
        password:this.password,
        role:this.role,
        created_at:this.createdAt,
        updated_at:this.updatedAt
    }
}
public ToEditDatabase():UserToEditDB{
 return{
    email:this.email,
    password:this.password,
    role:this.role, 
    updated_at:this.updatedAt

 }
}

public ToPayload():TokenPayload{
    return{
        id:this.id,
        name:this.name,
        role:this.role
    }
}
    

}