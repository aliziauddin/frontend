import React from "react"
import { Grid } from "@mui/material"
import Welcome from "./Welcome"
import PieChart from "./PieChart"

const styles = () => ({
  container: {
    padding: 2
  }
})

const Homepage = () => {
  const classes = styles()
  return (
    <Grid container sx={classes.container}>
      <Welcome />
      <PieChart />
    </Grid>
  )
}

export default Homepage
