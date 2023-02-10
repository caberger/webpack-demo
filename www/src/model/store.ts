import "./process.js"
import produce from "immer"
import { BehaviorSubject } from "rxjs"
import { Model } from "./model"
import { User } from "./user"

/*
import * as process from "process"
window.process = window.process || process
window.process.env = window.process.env || {}
window.process.env.NODE_ENV = "development"
*/

const store = createStore()

export function setUsers(users: User[]) {
    let nextState = produce(store.getValue(), draft => {
        draft.users = users
    })
    store.next(nextState)
}

function createStore() {
    const initialState: Model = {
        users: []
    }
    return new BehaviorSubject<Model>(initialState)
}

export default store
