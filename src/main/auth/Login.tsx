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
import { Link, useNavigate } from "react-router-dom"
import UserContext from "../../context/user/UserContext"
import CustomCard from "../../common/CustomCard"
import AuthContainer from "../../main/AuthContainer"
import { UserContextType } from "../../@types/UserContext"
import backend from "../../graphql/backend"
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

const Login = () => {
  const classes = styles()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const userContext = useContext(UserContext) as UserContextType
  const { updateSnackBar } = useContext(
    GlobalMessageContext
  ) as GlobalMessageContextType

  const [loginMutation, { error, loading }] = useMutation(LOGIN_MERCHANT, {
    client: backend
  })
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

  function emailChangeHandler(event: any) {
    const value = event.target.value
    setEmail(value)
  }

  function passwordChangeHandler(event: any) {
    const value = event.target.value
    setPassword(value)
  }

  function toggleShowPassword() {
    setShowPassword(!showPassword)
  }

  function handleKeyPress(event: any) {
    if (event.key === "Enter") login()
  }

  function isInvalid() {
    return email === "" || password === ""
  }

  async function login() {
    try {
      const data = await loginMutation({
        variables: {
          email,
          password: password.trim()
        }
      })
      userContext.updateUser({
        token: data.data.login.token,
        name: data.data.login.name,
        email: data.data.login.email
      })
      navigate("/")
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
                  <Typography sx={classes.heading}>Login</Typography>
                </Grid>
              </Grid>
              <Grid item>
                <TextField
                  sx={classes.inputField}
                  required
                  fullWidth
                  value={email}
                  label="Email"
                  onChange={emailChangeHandler}
                  onKeyDown={handleKeyPress}
                  placeholder="abc@xyz.com"
                  type={"text"}
                  variant="outlined"
                  disabled={loading}
                />
              </Grid>
              <Grid item>
                <TextField
                  sx={classes.inputField}
                  required
                  fullWidth
                  value={password}
                  label="Password"
                  onChange={passwordChangeHandler}
                  onKeyDown={handleKeyPress}
                  placeholder="****"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
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
                  disabled={loading}
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
                  onClick={login}
                  disabled={isInvalid()}
                  sx={classes.loginButton}
                >
                  Login
                </Button>
              )}
            </Grid>
            <Typography variant="body2" align="center">
              Don't have an account? <Link to="/signup">Signup</Link>
            </Typography>
          </CustomCard>
        </Grid>
      }
    />
  )
}

export default Login

const LOGIN_MERCHANT = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      name
      token
      email
    }
  }
`
