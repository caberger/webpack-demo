import { setCurrentUser } from "Model/store"
import Navigo, { Match } from "navigo"

declare var process : {
    env: {
      BASE_HREF: string
    }
}
const baseHRef = process.env.BASE_HREF
if (baseHRef) {
    const base = document.querySelector("base")
    if (base) {
        console.log("base=", baseHRef)
        base.setAttribute("href", baseHRef)
    }
}

const router = new Navigo(baseHRef)

router.on({
    "/customers/:id": (match: Match) => setCurrentUser(parseInt(match.data.id)),
    "/customers": (_: Match) => setCurrentUser(undefined),
    "/": () => router.navigate("/customers")
})
router.resolve()

export { router }