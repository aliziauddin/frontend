import React from "react"
import { GlobalMessageContextType } from "../../@types/GlobalMessageContext"

const GlobalMessageContext =
  React.createContext<GlobalMessageContextType | null>(null)

export const GlobalMessageProvider = GlobalMessageContext.Provider
export const GlobalMessageConsumer = GlobalMessageContext.Consumer

export default GlobalMessageContext
