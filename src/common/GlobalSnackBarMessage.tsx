import { useContext } from "react"
import { GlobalMessageContextType } from "../@types/GlobalMessageContext"
import GlobalMessageContext from "../context/globalMessage/GlobalMessageContext"
import CommonSnackbar from "./CommonSnackBar"

const GlobalSnackBarMessage = () => {
  const { snackBar, updateSnackBar } = useContext(
    GlobalMessageContext
  ) as GlobalMessageContextType

  return (
    <CommonSnackbar
      variant={snackBar.variant}
      open={snackBar.show}
      message={snackBar.message}
      onClose={() =>
        updateSnackBar({ show: false, variant: "success", message: "" })
      }
    />
  )
}

export default GlobalSnackBarMessage
