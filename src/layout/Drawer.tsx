import { useContext } from "react"
import { Drawer, ListItem, List, Grid, Tooltip } from "@mui/material"

import TODO_LOGO from "../assets/images/logos/todoImg.png"
import DashboardIcon from "../assets/images/icons/dashboard.svg"
import OrderIcon from "../assets/images/icons/orders.svg"
import LogoutIcon from "../assets/images/icons/logout.svg"

import DashboardInactiveIcon from "../assets/images/icons/dashboard_inactive.svg"
import OrderInactiveIcon from "../assets/images/icons/orders_inactive.svg"
import LogoutInactiveIcon from "../assets/images/icons/logout_inactive.svg"

import customBlack from "../main/styles/color/customBlack"

import { useTheme, Theme } from "@mui/material/styles"
import { useNavigate, useLocation } from "react-router-dom"
import UserContext from "../context/user/UserContext"
import { UserContextType } from "../@types/UserContext"

export const DrawerWidth = 48

const styles = (theme: Theme) => ({
  drawerList: {
    width: DrawerWidth,
    padding: 1.5,
    flexShrink: 0,
    height: "calc(100vh - 24px)",
    backgroundColor: theme.palette.common.white
  },
  logo: {
    textAlign: "center",
    padding: "20px 0"
  },
  logo_image: {
    height: 40
  },
  listItem: {
    padding: 1.5,
    // color: theme.palette.border.color,
    borderRadius: 4.5,
    width: "60%",
    margin: "0 auto",
    justifyContent: "center"
  },
  selectedRoute: {
    padding: 2,
    backgroundColor: theme.custom.blueGrey,
    borderRadius: 4.5,
    width: "60%",
    margin: "0 auto",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: customBlack[400]
    }
  },
  icon: { color: theme.custom.blueGrey, width: 24 }
})

const LayoutDrawer = () => {
  const classes = styles(useTheme())
  const navigate = useNavigate()
  const location = useLocation()
  const userContext = useContext(UserContext) as UserContextType

  const DrawerItems = [
    {
      title: "Dashboard",
      icon: DashboardIcon,
      inActiveIcon: DashboardInactiveIcon,
      action: () => navigate("/"),
      route: "/"
    },
    {
      title: "Todo",
      icon: OrderIcon,
      inActiveIcon: OrderInactiveIcon,
      action: () => navigate("/todo"),
      route: "/todo"
    },
    {
      title: "Logout",
      icon: LogoutIcon,
      inActiveIcon: LogoutInactiveIcon,
      action: () => logout(),
      route: "/login"
    }
  ]
  const logout = () => {
    userContext.logout()
  }

  const isSelected = (route: string) => {
    return location.pathname === route
  }

  return userContext.isAuthenticated() ? (
    <Drawer variant="permanent">
      <List sx={classes.drawerList}>
        <Grid sx={classes.logo}>
          <img src={TODO_LOGO} style={classes.logo_image} alt="logo"></img>
        </Grid>

        {DrawerItems.map((item, index) => (
          <ListItem
            sx={
              isSelected(item.route) ? classes.selectedRoute : classes.listItem
            }
            button
            key={index}
            onClick={item.action}
          >
            <Tooltip title={item.title}>
              <img
                src={isSelected(item.route) ? item.icon : item.inActiveIcon}
                alt={item.title}
                style={classes.icon}
              />
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Drawer>
  ) : (
    <></>
  )
}

export default LayoutDrawer
