import React, { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UserContextType } from "../@types/UserContext"
import UserContext from "../context/user/UserContext"
import Container from "../main/Container"

export const PrivateRoute = ({
  component: RouteComponent
}: {
  component: React.FC
}) => {
  const navigate = useNavigate()
  const userContext = useContext(UserContext) as UserContextType
  useEffect(() => {
    if (!userContext.isAuthenticated()) {
      userContext.removeUser()
      navigate("/login")
      return
    }
  }, [userContext.user, navigate])
  return <Container children={<RouteComponent />} />
}

export default PrivateRoute
