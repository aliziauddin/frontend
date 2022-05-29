import React from "react"
import { OverridableComponent } from "@mui/material/OverridableComponent"
import { SvgIconTypeMap } from "@mui/material"

export interface VariantIconType {
  success: OverridableComponent<SvgIconTypeMap<{}, "svg">>
  error: OverridableComponent<SvgIconTypeMap<{}, "svg">>
}

export interface SnackbarContentProps {
  variant: "success" | "error"
  message: string
  title?: string
}

export interface CommonSnackbarProps {
  message: string
  variant: "success" | "error"
  open: boolean
  action?: React.MouseEventHandler
  title?: string
  onClose: () => void
  autoHideDuration?: number
  position?: PositionParams
}
interface PositionParams {
  vertical: "top" | "bottom"
  horizontal: "left" | "center" | "right"
}
