import { BrowserRouter as Router } from "react-router-dom"
import GlobalMessageContainer from "../context/globalMessage/GlobalMessageContainer"
import UserContainer from "../context/user/UserContainer"
import Routes from "../layout/Router"

export const MobileViewPort = "(max-width:600px)"

function Main() {
  return (
    <Router>
      <GlobalMessageContainer>
        <UserContainer>
          <Routes />
        </UserContainer>
      </GlobalMessageContainer>
    </Router>
  )
}

export default Main
