import { User } from "./user"

/** Our readonly single source of truth */
export interface Model {
    readonly currentUserId?: number
    readonly users: User[]
}
