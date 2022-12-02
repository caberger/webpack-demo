import { html, render } from "lit-html"
import { USER_SELECTED_EVENT } from "."
import { User } from "../../model/user"
import userService from "../../user-service"
import store from "../../model/store"
import { distinctUntilChanged, map } from "rxjs"

const tableTemplate = html`
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <table class="w3-table-all">
        <thead>
            <tr>
                <th>Id</th><th>Name</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
`
const rowTemplate = (user: User) => html`
    <td>${user.id}</td><td>${user.name}</td>
`
class UserTableComponent extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }
    connectedCallback() {
        console.log("connected usertable")
        userService.fetchAll()
        store
            .pipe(
                map(model => model.users),
                distinctUntilChanged()
            )
            .subscribe(users => {
                this.render(users)
            })
    }
    private render(users: Array<User>) {
        render(tableTemplate, this.shadowRoot)

        const tbody = this.shadowRoot.querySelector("tbody")
        users.forEach(user => {
            const row = tbody.insertRow()
            row.onclick = () => {
                const event = new CustomEvent(USER_SELECTED_EVENT, {detail: {user}})
                this.dispatchEvent(event)
            }
            render(rowTemplate(user), row)
        });
    }
}

customElements.define("user-table", UserTableComponent)