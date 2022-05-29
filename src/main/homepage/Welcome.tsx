import { Grid, Typography } from "@mui/material"
import React, { useContext } from "react"
import UserContext from "../../context/user/UserContext"
import { useTheme, Theme } from "@mui/material/styles"
import { UserContextType } from "../../@types/UserContext"

const styles = (theme: Theme) => ({
  grid: {
    margin: 1
  },
  caption: { fontSize: 14, color: theme.custom.blueGrey }
})

const Welcome = () => {
  const classes = styles(useTheme())
  const userContext = useContext(UserContext) as UserContextType

  return (
    <Grid container sx={classes.grid}>
      {userContext.user ? (
        <Grid
          container
          justifyContent="space-between"
          wrap="nowrap"
          alignItems="center"
        >
          <Grid item xs={6}>
            <Typography variant="h3">
              Welcome {userContext.user.name}{" "}
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
    </Grid>
  )
}

export default Welcome
