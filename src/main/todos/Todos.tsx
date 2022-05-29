import { useContext, useEffect, useState } from "react"
import { gql, useLazyQuery } from "@apollo/client"
import CustomCard from "../../common/CustomCard"
import OrderHeader from "./TodoTableHeader"
import TodoTable from "./TodoTable"
import { scrollTop } from "../../utils/scrollTopHelper"
import UserContext from "../../context/user/UserContext"
import { UserContextType } from "../../@types/UserContext"

const ORDER_PER_PAGE: number = 10

const Todos = () => {
  const userContext = useContext(UserContext) as UserContextType

  const [page, setPage] = useState(0)

  const [fetchTodos, { data, loading, refetch }] = useLazyQuery(TODOS, {
    fetchPolicy: "network-only"
  })

  useEffect(() => {
    scrollTop()
    getOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getOrders = (offset: number = 0) => {
    const offsetWithPage = offset ? ORDER_PER_PAGE * offset : 0
    fetchTodos({
      variables: {
        email: userContext.user.email,
        size: ORDER_PER_PAGE,
        offset: offsetWithPage
      }
    })
    setPage(offset)
  }

  return (
    <CustomCard fullWidth>
      <OrderHeader refetch={refetch} loading={loading} />
      {data ? (
        <TodoTable
          todos={data?.todos?.todos}
          page={page}
          totalTodos={data?.todos?.totalCount}
          todoPerPage={ORDER_PER_PAGE}
          fetchTodos={getOrders}
        />
      ) : (
        <></>
      )}
    </CustomCard>
  )
}
export default Todos

export const TODOS = gql`
  query todos($email: String, $offset: Int, $size: Int) {
    todos(email: $email, offset: $offset, size: $size) {
      todos {
        todoId
        task
        isCompleted
      }
      totalCount
    }
  }
`
