
import "./components/app-component"

declare var process : {
    env: {
      BASE_HREF: string
    }
}
const baseHRef = process.env.BASE_HREF
if (baseHRef) {
    const base = document.getElementById("base")
    if (base) {
        base.setAttribute("href", baseHRef)
    }
}

console.log("base=", baseHRef);