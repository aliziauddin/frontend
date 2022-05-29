import React from "react"

import { Grid } from "@mui/material"
import { useTheme, Theme } from "@mui/material/styles"

const styles = (theme: Theme) => ({
  authContainer: {
    backgroundColor: theme.custom.bgGrey,
    minHeight: "100vh"
  }
})

const AuthContainer = ({ children }: { children: React.ReactNode }) => {
  const classes = styles(useTheme())
  return <Grid sx={classes.authContainer}>{children}</Grid>
}

export default AuthContainer
