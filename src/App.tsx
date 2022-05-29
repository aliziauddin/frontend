import React from "react"
import Main from "./main/Main"
import backend from "./graphql/backend"
import { ApolloProvider } from "@apollo/client"
import { ThemeMaker } from "./main/styles/ThemeMaker"
// import VersionContainer from "./context/VersionContainer"

const App: React.FC = () => {
  return (
    <div className="App">
      <ApolloProvider client={backend}>
        <ThemeMaker>
          <Main />
        </ThemeMaker>
      </ApolloProvider>
    </div>
  )
}

export default App
