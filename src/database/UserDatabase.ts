import { UserDB, UserToEditDB } from "../types"
import { BaseDatabase } from "./BaseDatabase"
import { PostDatabase } from "./PostDatabase"
import { ReactionDatabase } from "./ReactionDatabase"

export class UserDatabase extends BaseDatabase {
    public static TABLE_USER = "users"


    public getAllUsers = async (): Promise<UserDB[]> => {
        const result: UserDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USER)
        return result
    }
    public getUserById = async (id: string): Promise<UserDB | undefined> => {
        const [user] = await BaseDatabase
            .connection(UserDatabase.TABLE_USER)
            .where({ id })
        return user
    }
    public getUserByEmail = async (email: string): Promise<UserDB | undefined> => {

        const [result]: UserDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USER)
            .where({ email })
        return result
    }
    public insertUser = async (user: UserDB): Promise<void> => {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USER)
            .insert(user)

    }
    public editUser = async (id: string, user: UserToEditDB): Promise<void> => {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USER)
            .update(user)
            .where({ id })

    }
    public deleteUser =async (id:string):Promise<void> => {
        await BaseDatabase
        .connection(ReactionDatabase.TABLE_REACTION)
        .del()
        .where({user_id:id})
        await BaseDatabase
        .connection(PostDatabase.TABLE_POST)
        .del()
        .where({creator_id:id})
        await BaseDatabase
        .connection(UserDatabase.TABLE_USER)
        .del()
        .where({id})
    }


}
