import { Roles, UserDB, UserToEditDB } from "../../../src/types"
import { BaseDatabase } from "../../../src/database/BaseDatabase"
import { nowDate } from "../../../src/constants/patterns"

export class UserDatabase extends BaseDatabase {
    public static TABLE_USER = "users"


    public getAllUsers = async (): Promise<UserDB[]> => {
        return [{
            id: "id-mock-a",
            name: "admin mock",
            email: "adimn@mock.com",
            password: "hash-senha",
            role: Roles.ADMIN,
            created_at: nowDate,
            updated_at: nowDate
        },
        {
            id: "id-mock",
            name: "user mock",
            email: "normal@mock.com",
            password: "hash-senha",
            role: Roles.NORMAL,
            created_at: nowDate,
            updated_at: nowDate
        },
        ]
    }
    public getUserById = async (id: string): Promise<UserDB | undefined> => {
        switch (id) {
            case "id-mock":
                return {
                    id: "id-mock-a",
                    name: "admin mock",
                    email: "adimn@mock.com",
                    password: "hash-senha",
                    role: Roles.ADMIN,
                    created_at: nowDate,
                    updated_at: nowDate
                }
                break;

            case "id-mock":
                return {
                    id: "id-mock",
                    name: "user mock",
                    email: "normal@mock.com",
                    password: "hash-senha",
                    role: Roles.NORMAL,
                    created_at: nowDate,
                    updated_at: nowDate
                }
                break;

            default:
                return undefined
                break;
        }
    }
    public getUserByEmail = async (email: string): Promise<UserDB | undefined> => {

        switch (email) {
            case "adimn@mock.com":
                return {
                    id: "id-mock-a",
                    name: "admin mock",
                    email: "adimn@mock.com",
                    password: "hash-senha",
                    role: Roles.ADMIN,
                    created_at: nowDate,
                    updated_at: nowDate
                }
                break;

            case "normal@mock.com":
                return {
                    id: "id-mock",
                    name: "user mock",
                    email: "normal@mock.com",
                    password: "hash-senha",
                    role: Roles.NORMAL,
                    created_at: nowDate,
                    updated_at: nowDate
                }
                break;

            default:
                return undefined
            
        }
    }
    public insertUser = async (user: UserDB): Promise<void> => {


    }
    public editUser = async (id: string, user: UserToEditDB): Promise<void> => {


    }
    public deleteUser = async (id: string): Promise<void> => {

    }
}
