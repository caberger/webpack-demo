import { BehaviorSubject } from "rxjs"
import { User } from "./user"

interface Model {
    readonly users: Array<User>
}

const initialState: Model = {
    users: new Array<User>
}

const store = new BehaviorSubject<Model>(initialState)
export default store
