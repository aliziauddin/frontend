import { useState, useContext, useEffect } from "react"
import {
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  CircularProgress,
  Typography
} from "@mui/material"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import gql from "graphql-tag"
import { useMutation } from "@apollo/client"
import { useNavigate } from "react-router-dom"
import CustomCard from "../../common/CustomCard"
import AuthContainer from "../../main/AuthContainer"
import GlobalMessageContext from "../../context/globalMessage/GlobalMessageContext"
import { GlobalMessageContextType } from "../../@types/GlobalMessageContext"
import GlobalSnackBarMessage from "../../common/GlobalSnackBarMessage"

const styles = () => ({
  container: {
    height: "100vh",
    width: "60%",
    "@media (max-width:800px)": {
      width: "100%"
    },
    margin: "auto"
  },
  logo: {
    marginBottom: 1
  },
  heading: {
    fontSize: 32,
    fontWeight: "700"
  },
  inputField: {
    margin: "12px 0"
  },
  loginButton: {
    margin: "12px 0",
    borderRadius: 4
  },
  loader: {
    textAlign: "center"
  }
})

const SignUp = () => {
  const classes = styles()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const { updateSnackBar } = useContext(
    GlobalMessageContext
  ) as GlobalMessageContextType

  const [signUpMutation, { error, loading }] = useMutation(SIGN_UP)
  const navigate = useNavigate()
  useEffect(() => {
    if (error) {
      updateSnackBar({
        show: true,
        variant: "error",
        message: error?.graphQLErrors[0]?.message || ""
      })
    }
  }, [error])

  function nameChangeHandler(event: any) {
    const value = event.target.value
    setName(value)
  }

  function passwordChangeHandler(event: any) {
    const value = event.target.value
    setPassword(value)
  }

  function emailChangeHandler(event: any) {
    const value = event.target.value
    setEmail(value)
  }

  function toggleShowPassword() {
    setShowPassword(!showPassword)
  }

  function isInvalid() {
    return name === "" || password === "" || email === ""
  }

  async function signUp() {
    try {
      await signUpMutation({
        variables: {
          name,
          email,
          password
        }
      })

      navigate("/login")
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <AuthContainer
      children={
        <Grid
          container
          direction="column"
          justifyContent="center"
          sx={classes.container}
        >
          <CustomCard>
            <Grid container direction="column">
              <GlobalSnackBarMessage />
              <Grid
                container
                item
                sx={classes.logo}
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography sx={classes.heading}>Sign Up</Typography>
                </Grid>
              </Grid>
              <Grid item>
                <TextField
                  required
                  fullWidth
                  sx={classes.inputField}
                  value={name}
                  label="User Name"
                  onChange={nameChangeHandler}
                  variant="outlined"
                  disabled={loading}
                />
              </Grid>
              <Grid item>
                <TextField
                  sx={classes.inputField}
                  required
                  fullWidth
                  value={email}
                  label="Email"
                  onChange={emailChangeHandler}
                  placeholder="abc@xyz.com"
                  type={"text"}
                  variant="outlined"
                  disabled={loading}
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  fullWidth
                  sx={classes.inputField}
                  value={password}
                  label="Password"
                  onChange={passwordChangeHandler}
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  disabled={loading}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={toggleShowPassword}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              {loading ? (
                <Grid item sx={classes.loader}>
                  <CircularProgress />
                </Grid>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={signUp}
                  disabled={isInvalid()}
                  sx={classes.loginButton}
                >
                  Sign Up
                </Button>
              )}
            </Grid>
          </CustomCard>
        </Grid>
      }
    />
  )
}

export default SignUp

const SIGN_UP = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, password: $password, email: $email)
  }
`
