export type UserContextType = {
  user: any
  updateUser: (updatedUser: any) => void
  logout: () => void
  getUser: () => string
  isAuthenticated: () => boolean
  removeUser: () => void
}
