import { TokenPayload } from "../../../src/services/TokenManager"
import { Roles } from "../../../src/types"

export class TokenManagerMock {

    public createToken = (payload: TokenPayload): string => {
        if (payload.role == Roles.NORMAL) {
            return "token-mock-normal"
        } else {
            return "token-mock-admin"
        }
    }

    public getPayload = (token: string): TokenPayload | null => {
        if (token == "token-mock-normal") {
            return {
                id: "id-mock",
                name: "user mock",
                role: Roles.NORMAL
            }

        } else if (token == "token-mock-admin") {
            return {
                id: "id-mock-a",
                name: "admin mock",
                role: Roles.ADMIN
            }

        } else {
            return null
        }
    }
}