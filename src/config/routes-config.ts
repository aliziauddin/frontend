import Homepage from "../main/homepage/Homepage"
import Todos from "../main/todos/Todos"

export const routes = [
  {
    key: "homepage",
    title: "Homepage",
    route: "/",
    auth_required: true,
    component: Homepage
  },
  {
    key: "todos",
    title: "Todo",
    route: "/todo",
    auth_required: true,
    component: Todos
  }
]
