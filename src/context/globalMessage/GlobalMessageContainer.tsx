import React, { useState } from "react"
import { SnackBarProps } from "../../@types/GlobalMessageContext"
import { GlobalMessageProvider } from "./GlobalMessageContext"

const GlobalMessageContainer = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [snackBar, setSnackBar] = useState<SnackBarProps>({
    show: false,
    variant: "success",
    message: ""
  })

  function updateSnackBar({
    show = false,
    variant = "success",
    message = ""
  }: SnackBarProps) {
    setSnackBar({
      show,
      variant,
      message
    })
  }
  return (
    <GlobalMessageProvider
      value={{
        snackBar,
        updateSnackBar
      }}
    >
      {children}
    </GlobalMessageProvider>
  )
}

export default GlobalMessageContainer
