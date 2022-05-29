import React from "react"
import { Grid, Typography } from "@mui/material"
import NotFoundImg from "../assets/images/lost.svg"
import { useTheme, Theme } from "@mui/material/styles"

const styles = (theme: Theme) => ({
  main: {
    textAlign: "center",
    marginTop: 36
  },
  image: {
    width: "100%",
    height: "auto",
    maxWidth: 500
  },
  text: {
    margin: "auto 12",
    color: theme.palette.secondary.main
  }
})

interface PageNotFoundProps {
  body?: string
  image?: string
}

const PageNotFound: React.FC<PageNotFoundProps> = ({ body, image }) => {
  const classes = styles(useTheme())
  return (
    <Grid container alignItems="center" direction="column" sx={classes.main}>
      <Grid item xs={6}>
        <img
          style={classes.image}
          src={image ? image : NotFoundImg}
          alt="Page not found"
        />
        {body ? (
          body
        ) : (
          <Typography sx={classes.text} variant="h6">
            Seems like you are lost
          </Typography>
        )}
      </Grid>
    </Grid>
  )
}

export default PageNotFound
