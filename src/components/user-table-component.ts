import { html, render } from "lit-html"
import { User } from "../model/user"
import userService from "../user-service"

console.log("JUHU!!!")


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
    private users: [User]

    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }
    async connectedCallback() {
        console.log("connected usertable")
        this.users = await this.load()
        this.render(this.users)
    }
    private render(users: [User]) {
        render(tableTemplate, this.shadowRoot)

        const tbody = this.shadowRoot.querySelector("tbody")
        users.forEach(user => {
            const row = tbody.insertRow()
            row.onclick = () => {
                alert(`user ${user.name} clicked`)
            }
            render(rowTemplate(user), row)
        });
    }
    private async load(): Promise<[User]>{
        const users = await userService.fetchAll()
        return users
    }
}

customElements.define("user-table", UserTableComponent)