import { setCurrentCustomer } from "Model/store"
import Navigo, { Match } from "navigo"

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
const router = new Navigo(baseHRef)
router.on("/customers/:id", (match: Match) => {
    console.log("route to", match.data)
    setCurrentCustomer(parseInt(match.data.id))

})
router.on("/customers", (data) => {
    console.log("routed to", data)
    setCurrentCustomer(undefined)
})
router.on("/", () => {
    router.navigate("/customers")
})
router.resolve()

export { router }