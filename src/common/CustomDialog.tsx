import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import { useTheme, Theme } from "@mui/material/styles"
import { CustomModalProps } from "../@types/CustomModal"

const styles = (theme: Theme) => ({
  modalContainer: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: theme.custom.white,
    padding: "20px 24px"
  }
})

const CustomModal: React.FC<CustomModalProps> = ({
  body,
  open,
  handleClose,
  width
}) => {
  const classes = styles(useTheme())

  return (
    <Modal
      disableEscapeKeyDown
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box width={width} sx={classes.modalContainer}>
        {body}
      </Box>
    </Modal>
  )
}

export default CustomModal
