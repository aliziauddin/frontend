import React from "react"
import { Snackbar, Slide, Alert } from "@mui/material"
import { CommonSnackbarProps } from "../@types/CommonSnackBar"

const styles = () => ({
  alertContainer: {
    width: "100%",
    padding: "8px,16px"
  }
})

const CommonSnackbar: React.FC<CommonSnackbarProps> = ({
  message,
  variant = "success",
  open,
  action = undefined,
  onClose,
  autoHideDuration = 3000,
  position = {
    vertical: "top",
    horizontal: "right"
  }
}) => {
  const classes = styles()
  return (
    <Snackbar
      anchorOrigin={position}
      onClose={onClose}
      open={open}
      onClick={action}
      TransitionComponent={Slide}
      autoHideDuration={autoHideDuration}
    >
      <Alert onClick={action} severity={variant} sx={classes.alertContainer}>
        {message}
      </Alert>
    </Snackbar>
  )
}
export default CommonSnackbar
