import React, { useContext, useState } from "react"
import {
  Button,
  CircularProgress,
  Grid,
  LinearProgress,
  Typography,
  TextField
} from "@mui/material"
import { TodoTableHeaderProps } from "../../@types/Todo"
import AddIcon from "@mui/icons-material/Add"
import gql from "graphql-tag"
import { useMutation } from "@apollo/client"
import { UserContextType } from "../../@types/UserContext"
import UserContext from "../../context/user/UserContext"
import { GlobalMessageContextType } from "../../@types/GlobalMessageContext"
import GlobalMessageContext from "../../context/globalMessage/GlobalMessageContext"
import GlobalSnackBarMessage from "../../common/GlobalSnackBarMessage"
import CustomModal from "../../common/CustomDialog"
import Title from "../../common/Title"

const styles = () => ({
  headerContainer: {
    marginBottom: 1
  },
  inputField: {
    margin: "12px 0 12px 0"
  }
})

const OrderTableHeader: React.FC<TodoTableHeaderProps> = ({
  refetch,
  loading
}) => {
  const classes = styles()
  const userContext = useContext(UserContext) as UserContextType
  const [open, setOpen] = useState(false)
  const [todo, setTodo] = useState("")
  const { updateSnackBar } = useContext(
    GlobalMessageContext
  ) as GlobalMessageContextType

  const [addMutation, { error, loading: addLoading }] = useMutation(ADD_TODO)

  const handleClose = () => setOpen(false)

  const todoChangeHandler = (event: any) => {
    const value = event.target.value
    setTodo(value)
  }
  const addTodo = async () => {
    try {
      await addMutation({
        variables: {
          email: userContext.user.email,
          task: todo
        }
      })
      setOpen(false)
      refetch()
    } catch (err) {
      console.error(error)
      updateSnackBar({
        show: true,
        variant: "error",
        message: "Error adding todo"
      })
    }
  }
  return (
    <>
      <GlobalSnackBarMessage />
      <Grid
        container
        justifyContent="space-between"
        alignItems="flex-end"
        sx={classes.headerContainer}
      >
        <Grid item>
          <Typography variant="h2">Todo</Typography>
        </Grid>

        <Grid item>
          <Grid container justifyContent="flex-end" alignItems="center">
            <Grid item md={12} textAlign="center">
              {addLoading ? (
                <CircularProgress />
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  onClick={() => setOpen(true)}
                  endIcon={<AddIcon />}
                >
                  Add
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <CustomModal
        width="500px"
        open={open}
        handleClose={handleClose}
        body={
          <>
            <Title title={"Add Todo"} />
            <TextField
              sx={classes.inputField}
              required
              fullWidth
              value={todo}
              label="Todo"
              onChange={todoChangeHandler}
              placeholder="Write your todo here"
              type={"text"}
              variant="outlined"
              disabled={loading}
              multiline
            />
            <Grid spacing={2} container justifyContent="flex-end">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={addTodo}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </>
        }
      />

      {loading ? <LinearProgress /> : <></>}
    </>
  )
}

export default OrderTableHeader

const ADD_TODO = gql`
  mutation AddTodo($email: String!, $task: String!) {
    addTodo(email: $email, task: $task) {
      task
      todoId
      isCompleted
    }
  }
`
