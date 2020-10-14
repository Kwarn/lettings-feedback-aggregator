import React from 'react'
import Chart from 'react-google-charts'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  pieChart: {
    margin: "auto"
  },
})

const Pie = ({ tallies }) => {
  const styles = useStyles()

  const locations = {
    poplar: 'Poplar',
    canningTown: 'Canning Town',
    epsom: 'Epsom',
    lewisham: 'Lewisham',
    walthamstow: 'Walthamstow',
    hayes: 'Hayes',
    stepneyGreen: 'Stepney Green',
  }
  const reason = {
    cost: 'Cost',
    commute: 'Commute Distance',
    travelLinks: 'Travel Links',
  }

  const locationPieData = [['Location', 'Number of Entries']]
  for (let key in tallies.location) {
    console.log(key)
    locationPieData.push([`${locations[key]}`, tallies.location[key]])
  }

  const reasonPieData = [['Reason', 'Number of Entries']]
  for (let key in tallies.reason) {
    console.log(key)
    reasonPieData.push([`${reason[key]}`, tallies.reason[key]])
  }

  console.log(locationPieData)

  return (
    <div className={styles.wrapper}>
      <Chart
        className={styles.pieChart}
        width={'50vw'}
        height={'50vh'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={locationPieData}
        options={{
          title: 'My Daily Activities',
        }}
        rootProps={{ 'data-testid': '1' }}
      />
      <Chart
        width={'50vw'}
        height={'50vh'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={reasonPieData}
        options={{
          title: 'My Daily Activities',
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </div>
  )
}

export default Pie
