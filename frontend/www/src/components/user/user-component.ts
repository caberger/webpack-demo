import { produce } from "immer"
import { html, render } from "lit-html"
import { store } from "Model/store"
import { User } from "Model/user"
import { distinctUntilChanged, filter, map } from "rxjs"

class UserComponent extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    private render(user: User): void {
        render(this.template(user), this.shadowRoot)
    }
    connectedCallback() {
        store
            .pipe(
                distinctUntilChanged(undefined, model => model.currentUser),
                map(model => model.currentUser),
                filter(user => !!user)
            )
            .subscribe(user => this.render(user))
    }
    private template(user: User) {
        return html`
        <div>
            <h1>This is the user component</h1>
            <div>TODO: render user with id ${user.id} and name ${user.name}</div>
        </div>
        <div>
            <hr/>
            <button @click=${back}>back</button>
        </div>
        `
    }
}

function back() {
    store.next(produce(store.getValue(), model => {
        delete model.currentUser
    }))
}
customElements.define("user-component", UserComponent)