export interface SnackBarProps {
  show: boolean
  message: string
  variant: "success" | "error"
}

export type GlobalMessageContextType = {
  snackBar: SnackBarProps
  updateSnackBar: ({ show, message, variant }: SnackBarProps) => void
}
