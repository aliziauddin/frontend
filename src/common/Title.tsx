import React from "react"
import { Grid, Typography } from "@mui/material"

const styles = () => ({
  title: {
    margin: "16px 0"
  }
})

interface TitleProps {
  title: string
}

const Title: React.FC<TitleProps> = ({ title }) => {
  const classes = styles()
  return (
    <Grid sx={classes.title}>
      <Typography variant="h2">{title}</Typography>
    </Grid>
  )
}

export default Title
