import { html, render } from "lit-html"
import { User } from "../../model/user"
import userService from "../../user-service"
import { store } from "Model/store"
import { distinctUntilChanged, map } from "rxjs"

export class UserTableComponent extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }
    connectedCallback() {
        userService.fetchAll()
        store
            .pipe(
                distinctUntilChanged(undefined, model => model.users),
                map(model => model.users)
            )
            .subscribe(users => this.render(users))
    }
    render(users: Array<User>) {
        const userClicked = (user: User) => {
            this.dispatchEvent(new CustomEvent("user-selected", {detail: {user}}))
        }
        const rowTemplate = (user: User) => html`
            <tr @click=${() => userClicked(user)}>
            <td >${user.id}</td><td>${user.name}</td>
        </tr>
        `
        const rows = users.map(rowTemplate)
        const tableTemplate = html`
            <style>
                tbody tr:hover {
                    cursor: pointer
                }
                #table-container {
                    width: 30rem;
                }
                .container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .container {
                    font-family: Roboto, sans-serif;
                }
            </style>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
            <div class="container">
                <div id="table-container" class="w3-container">
                    <div class="w3-card">
                        <header class="w3-container w3-blue">
                            <h1>Our Clients</h1>
                        </header>
                        <div id="table" class="w3-container">
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
                        </div>
                        <footer class="w3-container w3-blue">
                            <h5>Just a demo.</h5>
                        </footer>
                    </div>
                </div>
            </div>
        `
        render(tableTemplate, this.shadowRoot)
    }
}

customElements.define("user-table", UserTableComponent)