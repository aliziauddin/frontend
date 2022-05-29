import { SyntheticEvent } from "react"

export interface TodoParams {
  todoId: string
  task: string
  isCompleted: boolean
}

export interface TodoTableProps {
  todos: OrderParams[]
  totalTodos: number
  page: number
  todoPerPage: number
  fetchTodos: (offset: number) => void
}

export interface TodoTableHeaderProps {
  refetch: () => void
  loading: boolean
}

export interface onChangeProps {
  event?: SyntheticEvent<Element, Event>
  value: string[]
  setValue: (value: string[]) => void
}
