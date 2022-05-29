import React, { useContext, useState } from "react"
import gql from "graphql-tag"
import { useMutation } from "@apollo/client"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Grid,
  LinearProgress,
  Paper,
  TextField
} from "@mui/material"
import Title from "../../common/Title"
import Pagination from "../../common/Pagination"
import { TodoParams, TodoTableProps } from "../../@types/Todo"
import { useTheme, Theme } from "@mui/material/styles"
import IconButton from "@mui/material/IconButton"
import {
  Done as DoneIcon,
  Delete as DeleteIcon,
  Edit as EditIcon
} from "@mui/icons-material"
import { GlobalMessageContextType } from "../../@types/GlobalMessageContext"
import GlobalMessageContext from "../../context/globalMessage/GlobalMessageContext"
import CustomModal from "../../common/CustomDialog"
const styles = (theme: Theme) => ({
  tableCell: {
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.main
  },
  tableIconCell: {
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.main,
    width: "20px",
    padding: 0
  },
  tableRowBg: {
    background: theme.custom.whiteGrey,
    cursor: "pointer"
  },
  tableRow: {
    cursor: "pointer"
  },
  inputField: {
    margin: "12px 0 12px 0"
  }
})

const TodoTable: React.FC<TodoTableProps> = ({
  todos,
  totalTodos,
  fetchTodos,
  page,
  todoPerPage
}) => {
  const classes = styles(useTheme())
  const [open, setOpen] = useState(false)
  const [todoId, setTodoId] = useState("")
  const [todo, setTodo] = useState("")
  const onPageChange = (event: any, newPage: number) => {
    fetchTodos(newPage)
  }
  const { updateSnackBar } = useContext(
    GlobalMessageContext
  ) as GlobalMessageContextType
  const [removeMutation, { error, loading: removeLoading }] =
    useMutation(REMOVE_TODO)

  const [updateMutation, { error: updateError, loading: updateLoading }] =
    useMutation(UPDATE_TODO)

  const removeTodo = async (id: string) => {
    try {
      await removeMutation({
        variables: {
          todoId: id
        }
      })
      fetchTodos(page)
    } catch (err) {
      console.error(error)
      updateSnackBar({
        show: true,
        variant: "error",
        message: "Error removing todo"
      })
    }
  }

  const handleUpdate = (todoId: string, task: string) => {
    setTodoId(todoId)
    setTodo(task)
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  const todoChangeHandler = (event: any) => {
    const value = event.target.value
    setTodo(value)
  }
  const updateTodo = async (todoId: string, isCompleted: boolean) => {
    try {
      const variables: {
        isCompleted?: boolean
        task?: string
        todoId: string
      } = {
        todoId
      }
      if (isCompleted) variables.isCompleted = true
      else variables.task = todo
      await updateMutation({
        variables
      })
      setOpen(false)
      fetchTodos(page)
    } catch (err) {
      console.error(updateError)
      updateSnackBar({
        show: true,
        variant: "error",
        message: "Error updating todo"
      })
    }
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={classes.tableCell} align="left">
                Task
              </TableCell>
              <TableCell
                sx={classes.tableIconCell}
                align="right"
                size="small"
              ></TableCell>
              <TableCell
                sx={classes.tableIconCell}
                align="right"
                size="small"
              ></TableCell>
              <TableCell
                sx={classes.tableIconCell}
                align="right"
                size="small"
              ></TableCell>
            </TableRow>
          </TableHead>
          {todos?.length ? (
            removeLoading || updateLoading ? (
              <LinearProgress />
            ) : (
              <TableBody>
                {todos.map((todo: TodoParams, index) => (
                  <TableRow
                    key={todo.todoId}
                    sx={index % 2 !== 0 ? classes.tableRowBg : classes.tableRow}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        textDecorationLine: todo.isCompleted
                          ? "line-through"
                          : "none",
                        textDecorationStyle: "solid"
                      }}
                    >
                      {todo.task}
                    </TableCell>
                    <TableCell
                      align="right"
                      onClick={() => updateTodo(todo.todoId, true)}
                    >
                      <IconButton aria-label="done">
                        <DoneIcon
                          fontSize="small"
                          color={todo.isCompleted ? "success" : "secondary"}
                        />
                      </IconButton>
                    </TableCell>
                    <TableCell
                      align="right"
                      onClick={() => handleUpdate(todo.todoId, todo.task)}
                    >
                      <IconButton aria-label="edit">
                        <EditIcon fontSize="small" color="secondary" />
                      </IconButton>
                    </TableCell>
                    <TableCell
                      align="right"
                      onClick={() => removeTodo(todo.todoId)}
                    >
                      <IconButton aria-label="delete">
                        <DeleteIcon fontSize="small" color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )
          ) : (
            <>
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={5}>
                    No records to display
                  </TableCell>
                </TableRow>
              </TableBody>
            </>
          )}
        </Table>
      </TableContainer>
      {todos?.length > 0 ? (
        <Pagination
          count={totalTodos}
          rowsPerPage={todoPerPage}
          page={page}
          onPageChange={onPageChange}
        />
      ) : (
        <></>
      )}
      <CustomModal
        width="500px"
        open={open}
        handleClose={handleClose}
        body={
          <>
            <Title title={"Edit Todo"} />
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
              // disabled={loading}
              multiline
            />
            <Grid spacing={2} container justifyContent="flex-end">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => updateTodo(todoId, false)}
                >
                  Edit
                </Button>
              </Grid>
            </Grid>
          </>
        }
      />{" "}
    </>
  )
}

export default TodoTable

const REMOVE_TODO = gql`
  mutation RemoveTodo($todoId: ID!) {
    removeTodo(todoId: $todoId)
  }
`

const UPDATE_TODO = gql`
  mutation UpdateTodo($todoId: ID!, $task: String, $isCompleted: Boolean) {
    updateTodo(todoId: $todoId, task: $task, isCompleted: $isCompleted)
  }
`
