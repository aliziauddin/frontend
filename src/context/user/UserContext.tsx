import React from "react"
import { UserContextType } from "../../@types/UserContext"

const UserContext = React.createContext<UserContextType | null>(null)

export const UserProvider = UserContext.Provider
export const UserConsumer = UserContext.Consumer

export default UserContext
