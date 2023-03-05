export class HashManagerMock {
    public hash = async (plaintext: string): Promise<string> => {
        if (plaintext == "senha") {
            return "hash-senha"
        }

        return "hash-mock"
    }

    public compare = async (plaintext: string, hash: string): Promise<boolean> => {
        if (plaintext == "senha" && hash == "hash-senha") {
            return true
        }

        return false
    }
}