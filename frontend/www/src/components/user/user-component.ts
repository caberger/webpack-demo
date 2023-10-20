import { html, render } from "lit-html"
import { getCurrentUser, setCurrentUser } from "Model/store"
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
                distinctUntilChanged(undefined, model => getCurrentUser(model)),
                map(model => getCurrentUser(model)),
                filter(user => !!user)
            )
            .subscribe(user => this.render(user))
    }
    private template(user: User) {
        return html`
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
        <style>
            .container {
                font-family: Roboto, sans-serif;
            }
        </style>
        <div class="container">
            <div class="message">
                <div class="message-header">
                    <p  class="has-text-white is-family-monospace">This is the user component</p>
                    <button class="delete" aria-label="delete" @click=${() => history.back()}></button>
                </div>
                <div class="message-body">
                    <p>TODO: render editor for user <span class="has-text-weight-bold is-family-monospace">${user.name}</span> with id ${user.id}.
                    </p>
                    <p>
                        This component uses bulma.css without bleeding style into other components.
                    </p>
                </div>
            </div>
        </div>
        `
    }
}

customElements.define("user-component", UserComponent)