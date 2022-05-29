import React from "react"

export interface CustomModalProps {
  body: React.ReactElement
  open: boolean
  handleClose: () => void
  width?: string
}
