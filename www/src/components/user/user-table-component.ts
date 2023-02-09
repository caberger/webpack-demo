import { html, render } from "lit-html"
import { USER_SELECTED_EVENT } from "."
import { User } from "../../model/user"
import userService from "../../user-service"
import store from "../../model/store"
import { distinctUntilChanged, map } from "rxjs"

const rowTemplate = (user: User, onclick: (user: User) => void) => html`
    <tr @click=${() => userClicked(user)}>
        <td >${user.id}</td><td>${user.name}</td>
    </tr>
`
function userClicked(user: User) {
    alert(`user ${user.name} selected`)
    this.dispatchEvent(new CustomEvent(USER_SELECTED_EVENT, {detail: {user}}))
}
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
        const rows = users.map(user => rowTemplate(user, user => userClicked(user)))
        const tableTemplate = html`
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
            <table class="w3-table-all">
                <thead>
                    <tr>
                        <th>Id</th><th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        `
        render(tableTemplate, this.shadowRoot)
    }
}

customElements.define("user-table", UserTableComponent)