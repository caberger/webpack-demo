import { html, render } from "lit-html"

import "./user-table-component"
import "./user-component"

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
    }
   
}
customElements.define("app-component", AppComponent)