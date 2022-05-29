import React, { useContext, useState } from "react"
import { LinearProgress, Grid, Typography, Divider } from "@mui/material"
import CustomCard from "../../common/CustomCard"
import { PieChart } from "react-minimal-pie-chart"
import gql from "graphql-tag"
import { useQuery } from "@apollo/client"
import UserContext from "../../context/user/UserContext"
import { UserContextType } from "../../@types/UserContext"

const styles = () => ({
  center: {
    textAlign: "center",
    margin: 8,
    display: "block"
  },
  card: {
    padding: "12px 0px",
    margin: "0px 8px"
  },
  mainContainer: {
    margin: 0
  },
  pieChart: {
    fontFamily: '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
    fontSize: "5px",
    height: "400px",
    marginTop: "16px"
  },
  summaryGrid: { textAlign: "center", marginTop: "16px" }
})

const PieCharts = () => {
  const userContext = useContext(UserContext) as UserContextType
  const classes = styles()
  const lineWidth = 60

  const { data, loading } = useQuery(TODOSTATS, {
    variables: {
      email: userContext.user.email
    },
    fetchPolicy: "network-only"
  })
  const [selected, setSelected] = useState<number | undefined>(0)

  return (
    <CustomCard fullWidth>
      <Typography variant="h5">Todo Summary</Typography>
      <Divider />
      {loading && !data ? (
        <Grid container sx={classes.center}>
          <LinearProgress />
        </Grid>
      ) : (
        <Grid
          container
          sx={classes.mainContainer}
          justifyContent="space-between"
          flexDirection="column"
        >
          <Grid container item sx={classes.summaryGrid}>
            <Grid item xs={6}>
              <Typography variant="h5">Completed</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">Pending</Typography>
            </Grid>
          </Grid>
          <Grid container item sx={{ textAlign: "center" }}>
            <Grid item xs={6}>
              <Typography>{data.todoStats.complete}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{data.todoStats.incomplete}</Typography>
            </Grid>
          </Grid>
          <Grid container item alignItems="center">
            <Grid item xs={9}>
              <PieChart
                style={classes.pieChart}
                data={[
                  {
                    title: "Completed",

                    value: data.todoStats.complete,
                    color: "#22AA6C"
                  },
                  {
                    title: "Pending",

                    value: data.todoStats.incomplete,
                    color: "#D44B6B"
                  }
                ]}
                radius={PieChart.defaultProps.radius - 6}
                lineWidth={60}
                segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
                segmentsShift={(index) => (index === selected ? 6 : 1)}
                animate
                label={({ dataEntry }) =>
                  Math.round(dataEntry.percentage) + "%"
                }
                labelPosition={100 - lineWidth / 2}
                labelStyle={{
                  fill: "#fff",
                  opacity: 0.75,
                  pointerEvents: "none"
                }}
                onClick={(_, index) => {
                  setSelected(index === selected ? undefined : index)
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h5">Key</Typography>
              <Typography color="#22AA6C">Completed</Typography>
              <Typography color="#D44B6B">Pending</Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
    </CustomCard>
  )
}

export default PieCharts

export const TODOSTATS = gql`
  query todoStats($email: String) {
    todoStats(email: $email) {
      incomplete
      complete
    }
  }
`
