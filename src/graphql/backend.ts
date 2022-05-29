import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import config from "../config/config"
import { getFromStorage } from "../utils/LocalStorage"

const httpLink = createHttpLink({
  uri: config["backend"].url
})

const authLink = setContext((_, { headers }) => {
  const user = getFromStorage()
  const token = user ? user.token : ""
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
})

const gqlClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default gqlClient
