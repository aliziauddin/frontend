import PageNotFound from "../error-pages/NotFound"
import { Routes, Route } from "react-router-dom"
import { routes } from "../config/routes-config"
import PrivateRoute from "./PrivateRoute"
import Login from "../main/auth/Login"
import SignUp from "../main/auth/Signup"

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} key="Login" />
      <Route path="/signup" element={<SignUp />} key="SignUp" />

      {routes.map((route) => (
        <Route
          path={route.route}
          element={<PrivateRoute component={route.component} />}
          key={route.key}
        />
      ))}

      <Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  )
}

export default Router
