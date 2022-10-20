import { User } from "./model/user"

const USER_URL = "https://jsonplaceholder.typicode.com/users"

class UserService {
    async fetchAll(): Promise<[User]> {
        const response = await fetch(USER_URL)
        const users = await response.json()
        return users
    }
}

const userService = new UserService()
export default userService