import React from "react"
import { Card } from "@mui/material"

const styles = () => ({
  box: {
    padding: 2,
    borderRadius: 3,
    margin: 1
  },
  fullWidth: {
    width: "97%"
  }
})

interface CustomCardProps {
  children: React.ReactNode
  fullWidth?: boolean
}

const CustomCard: React.FC<CustomCardProps> = ({
  children,
  fullWidth = false
}) => {
  const classes = styles()
  return (
    <Card
      elevation={0}
      sx={{ ...classes.box, ...(fullWidth && classes.fullWidth) }}
    >
      {children}
    </Card>
  )
}

export default CustomCard
