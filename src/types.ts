export enum Roles {
    ADMIN="ADMIN",
    NORMAL="NORMAL"
}

export interface UserOutput{ 
    id:string,
    name:string,
    email:string,
    role:Roles,
    createdAt:string,
    updatedAt:string

}
export interface UserDB {
    id:string,
    name:string,
    email:string,
    password:string,
    role:Roles,
    created_at:string,
    updated_at:string
}

export interface UserToEditDB{
    email:string, 
    password:string,
    role:Roles, 
    updated_at:string
}

export interface PostDB{
    id:string,
    creator_id:string,
    content:string,
    likes:number,
    dislikes:number,
    comments:number,
    created_at:string,
    updated_at:string
}
export interface PostEditDB{
    content?:string,
    likes?:number,
    dislikes?:number,
    comments?:number,
    updated_at?:string
}

export interface CommentDB{
    id:string,
    creator_id:string,
    post_id:string,
    content:string,
    likes:number,
    dislikes:number,
    created_at:string,
    updated_at:string
}
export interface CommentEditDB{
    content?:string,
    likes?:number,
    dislikes?:number,
    updated_at?:string
}

export interface Reaction{
    user_id:string,
    post_id:string,
    like:boolean
}
export interface ReactionComment{
    user_id:string,
    comment_id:string,
    like:boolean
}

export interface TokenPayload{
    id:string,
    name:string,
    role:Roles
}