import { html, render } from "lit-html"

const template = html`
    <div>User: Max Mustermann</div>
` 

class UserComponent extends HTMLElement{
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    connectedCallback() {
        this.render()
        
    }
    private render() {
        render(template, this.shadowRoot)
    }
}

customElements.define("user-component", UserComponent)