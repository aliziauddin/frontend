import { createTheme } from "@mui/material/styles"
import customBlack from "./color/customBlack"
import { grey } from "@mui/material/colors"

export const MobileView = "(max-width:1024px)"
export const createMaterialTheme = (color = customBlack[500]) => {
  return createTheme({
    palette: {
      primary: {
        main: color,
        contrastText: "#fff"
      },
      secondary: {
        main: "#2E3B63"
      },
      captionText: {
        color: customBlack[400]
      },
      errorBar: {
        border: "#FF4D4E",
        color: "#FF4D4E"
      },
      border: {
        color: grey[100]
      },
      common: {
        white: "white"
      }
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 16
          }
        }
      }
    },
    snackBar: {
      color: "#FFFFFF",
      error: {
        background: "#FF4D4E"
      }
    },
    primaryButton: {
      color: "white",
      borderRadius: 20
    },
    typography: {
      fontFamily: "'Nunito'",
      allVariants: {
        color: customBlack[500]
      },
      h2: {
        fontWeight: 700,
        fontSize: 32
      },
      h5: {
        fontWeight: 700,
        fontSize: 18
      },
      subtitle1: {
        fontSize: 18,
        fontWeight: 600
      },
      h3: {
        fontSize: 24,
        fontWeight: 600
      },
      h4: {
        fontWeight: 700
      }
    },
    links: {
      textDecoration: "none",
      color: color
    },
    bg: {
      main: "#fff",
      light: "#F4F5F7"
    },
    custom: {
      white: "#FFFFFF",
      lightgrey: "#969696",
      whiteGrey: "#EFEFEF",
      blueGrey: "#353c53",
      grey: "#DDDDDD",
      darkGrey: "#F4F4F4",
      blue: "#385ab5",
      bgGrey: "#F6F9FE",
      inactiveGrey: "#808080",
      red: "#f44336"
    }
  })
}
