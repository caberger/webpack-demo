//import {suite, test, should } from "./utility"
import { suite, test } from '@testdeck/mocha';
import store, { setUsers } from "../src/model/store"
import { map } from "rxjs"
import { User } from "../src/model/user"
import * as chai from "chai"

@suite
export class StoreTest {
    private users: User[]
    before() {
        console.log("setup")
        this.users = [{id: 1, name: "John Doe"}]
    }
    @test 'store should call subscribe function twice when users change'() {
        let responses = Array<User[]>()
        store
            .pipe(
                map(model => model.users)
            )
            .subscribe(users => {
                responses.push(users);
                console.log("users changed", users, responses)
            })

        setUsers(this.users)
        chai.expect(responses).to.have.lengthOf(2)
        chai.expect(responses[0]).to.have.lengthOf(0)
        chai.expect(responses[1][0].name).to.equal("John Doe")
        console.log("test ended", responses)
    }
}

