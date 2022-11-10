import produce from "immer"
import store from "./model/store"

const USER_URL = "https://jsonplaceholder.typicode.com/users"

class UserService {
    async fetchAll() {
        const response = await fetch(USER_URL)
        const users = await response.json()
        let nextState = produce(store.getValue(), draft => {
            draft.users = users
        })
        store.next(nextState)
    }
}

const userService = new UserService()
export default userService