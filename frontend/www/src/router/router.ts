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

router.on({
    "/customers/:id": (match: Match) => setCurrentCustomer(parseInt(match.data.id)),
    "/customers": (_: Match) => setCurrentCustomer(undefined),
    "/": () => router.navigate("/customers")
})
router.resolve()

export { router }