import React from "react"
import { Grid } from "@mui/material"
import LayoutDrawer, { DrawerWidth } from "../layout/Drawer"
import { useTheme, Theme } from "@mui/material/styles"
import GlobalSnackBarMessage from "../common/GlobalSnackBarMessage"

const styles = (theme: Theme) => ({
  container: {
    backgroundColor: theme.custom.bgGrey,
    padding: "12px 12px 0 12px",
    minHeight: "100vh",
    width: `calc(100vw - (${DrawerWidth}px + 50px))`
  },
  root: {
    display: "flex"
  }
})

const Container = ({ children }: { children: React.ReactNode }) => {
  const classes = styles(useTheme())
  return (
    <Grid container direction="row-reverse" sx={classes.root}>
      <LayoutDrawer />
      <GlobalSnackBarMessage />
      <Grid sx={classes.container}>{children}</Grid>
    </Grid>
  )
}

export default Container
