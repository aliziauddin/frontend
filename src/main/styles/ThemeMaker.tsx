import React from "react"
import { ThemeProvider, StyledEngineProvider } from "@mui/material"
import { createMaterialTheme } from "./theme"

interface ThemeMakerChildrenProps {
  children: React.ReactNode
}

export const ThemeMaker: React.FC<ThemeMakerChildrenProps> = ({ children }) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={createMaterialTheme()}>{children}</ThemeProvider>
    </StyledEngineProvider>
  )
}
