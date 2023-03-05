import { nowDate } from "../../../src/constants/patterns"
import { BaseDatabase } from "../../../src/database/BaseDatabase"
import { PostDB, PostEditDB } from "../../../src/types"
import { ReactionDatabase } from "./ReactionDatabaseMock"

export class PostDatabase extends BaseDatabase {
    public static TABLE_POST = "posts"

    public getAllPosts = async (): Promise<PostDB[]> => {

        return [
            {
                id: "id-mock-p1",
                creator_id: "id-mock",
                content: "Post mockado 1",
                likes: 0,
                dislikes: 0,
                comments: 0,
                created_at: nowDate,
                updated_at: nowDate
            },
            {
                id: "id-mock-p2",
                creator_id: "id-mock",
                content: "Post mockado 2",
                likes: 1,
                dislikes: 0,
                comments: 1,
                created_at: nowDate,
                updated_at: nowDate
            }
        ]

    }
    public getPostByUserId = async (idUser: string): Promise<PostDB[]> => {

        if (idUser === "id-mock") {
            return [{
                id: "id-mock-p2",
                creator_id: "id-mock",
                content: "Post mockado 2",
                likes: 1,
                dislikes: 0,
                comments: 1,
                created_at: nowDate,
                updated_at: nowDate
            }]
        }
        return []

    }
    public getPostById = async (id: string): Promise<PostDB | undefined> => {
        if (id === "id-mock-p2") {
            return {
                id: "id-mock-p2",
                creator_id: "id-mock",
                content: "Post mockado 2",
                likes: 1,
                dislikes: 0,
                comments: 1,
                created_at: nowDate,
                updated_at: nowDate
            }
        }

    }
    public insertPost = async (post: PostDB): Promise<void> => {

    }

    public editPostbyId = async (id: string, toEdit: PostEditDB): Promise<void> => {

    }
    public deletePostById = async (id: string): Promise<void> => {


    }
}