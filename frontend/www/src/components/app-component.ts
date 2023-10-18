import { html, render } from "lit-html"

import "./user/user-component"
import "./user/user-table-component"
import { store } from "Model/store"
import { distinctUntilChanged } from "rxjs"
import { Model } from "Model/model"
import { User } from "Model/user"
import { router } from "../router/router"

class AppComponent extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    connectedCallback() {
        store
            .pipe(distinctUntilChanged())
            .subscribe(model => this.render(model))
    }
    private template(model: Model) {
        return html`
            <user-table ?hidden=${!!model.currentUserId} @user-selected=${(e: CustomEvent) => this.userSelected(e.detail.user)}></user-table>
            <user-component ?hidden=${!model.currentUserId}></user-component>
        `
    }
    userSelected(user: User) {
        router.navigate(`/customers/${user.id}`)
    }
    private render(model: Model) {
        render(this.template(model), this.shadowRoot)
    }
}
customElements.define("app-component", AppComponent)