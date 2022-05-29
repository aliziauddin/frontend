import "styled-components"
import { Theme } from "@mui/material/styles"
interface CustomTheme {
  bg: {
    main: string
    light: string
  }
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: number
        }
      }
    }
  }
  snackBar: {
    color: string
    error: {
      background: string
    }
  }
  primaryButton: {
    color: string
    borderRadius: number
  }
  links: {
    textDecoration: string
    color: string
  }
  custom: {
    white: string
    lightgrey: string
    whiteGrey: string
    blueGrey: string
    grey: string
    darkGrey: string
    blue: string
    bgGrey: string
    inactiveGrey: string
    red: string
  }
}

interface CustomPaletteOptions {
  captionText: {
    color: string
  }
  errorBar: {
    border: string
    color: string
  }
  border: {
    color: string
  }
}

declare module "@mui/material/styles" {
  export interface Theme extends CustomTheme {}
  export interface ThemeOptions extends CustomTheme {}
  export interface PaletteOptions extends CustomPaletteOptions {}
}

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
