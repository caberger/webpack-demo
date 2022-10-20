import { html, render } from "lit-html"

import "./user"
import { USER_SELECTED_EVENT } from "./user"

const template = html`
    <user-table></user-table>
    <user-component></user-component>
`

class AppComponent extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    connectedCallback() {
        console.log("app component connected")
        this.render()
    }
    private render() {
        render(template, this.shadowRoot)
        const userTableComponent: HTMLElement = this.shadowRoot.querySelector("user-table")
        const userComponent: HTMLElement = this.shadowRoot.querySelector("user-component")
        userTableComponent.addEventListener(USER_SELECTED_EVENT, (e: CustomEvent) => {
            const user = e.detail.user
            userComponent.setAttribute("selected-user", user.id)
            userComponent.style.display = "block"
            userTableComponent.style.display = "none"
            console.log("user selected:", user)
        })
    }
}
customElements.define("app-component", AppComponent)