import { produce } from "immer"
import { BehaviorSubject } from "rxjs"
import { Model } from "./model"
import { User } from "./user"

export function setUsers(users: User[]) {
    let nextState = produce(store.getValue(), draft => {
        draft.users = users
    })
    store.next(nextState)
}

const initialState: Model = {
    users: []
}
const store = new BehaviorSubject<Model>(initialState)
export { store }
