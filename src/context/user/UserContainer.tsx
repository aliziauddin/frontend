import React, { useState } from "react"
import { UserProvider } from "./UserContext"
import {
  getFromStorage,
  removeFromStorage,
  addToStorage
} from "../../utils/LocalStorage"
import { useNavigate } from "react-router-dom"
import jwt_decode from "jwt-decode"

const UserContainer = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(getFromStorage())

  async function updateUser(updatedUser: any) {
    if (updatedUser) {
      addToStorage(updatedUser)
      setUser(updatedUser)
    }
  }

  const isAuthenticated = (): boolean => {
    const user = getFromStorage()
    const token = user ? user.token : ""
    if (token) {
      const decodedToken: any = jwt_decode(token)
      return !(Date.now() >= decodedToken.exp * 1000)
    }
    return false
  }

  const removeUser = (): void => {
    removeFromStorage()
    setUser(null)
  }

  const logout = async () => {
    removeUser()
    navigate("/login")
  }

  const getUser = () => {
    return user?.user?.username
  }

  return (
    <UserProvider
      value={{
        user,
        updateUser,
        logout,
        getUser,
        isAuthenticated,
        removeUser
      }}
    >
      {children}
    </UserProvider>
  )
}

export default UserContainer
