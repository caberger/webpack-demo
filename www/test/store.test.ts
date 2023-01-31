import {suite, test } from "./utility"
import store, { setUsers } from "../src/model/store"
import { map } from "rxjs"
import { User } from "../src/model/user"

@suite
export class StoreTest {

    before() {
        console.log("setup")
    }
    @test 'store should call subscribe function when users change'() {
        store
            .pipe(
                map(model => model.users)
            )
            .subscribe(users => console.log("users changed", users))

        const users: User[] = [{id: 1, name: "John Doe"}]
        setUsers(users)
    }
}

