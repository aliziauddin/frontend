export const addToStorage = (data: any) => {
  data = JSON.stringify(data)
  localStorage.setItem("user", data)
}

export const getFromStorage = () => {
  const user = localStorage.getItem("user")
  return user ? JSON.parse(user) : null
}

export const removeFromStorage = () => {
  localStorage.removeItem("user")
}
