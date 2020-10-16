import React, { useState } from 'react'
import Chart from 'react-google-charts'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import {
  mapLocationDisplayStrToKeyName,
  mapLocationKeyNameToDisplayableStr,
} from '../../../shared/Utility'

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  pieChart: {
    margin: 'auto',
  },
})

const Pie = ({ fbData, tallyData, mapReasonsToLocationCb }) => {
  const [selectedLocation, setSelectedLocation] = useState('')
  const styles = useStyles()

  const locations = {
    canningTown: 'Canning Town',
    epsom: 'Epsom',
    hayes: 'Hayes',
    lewisham: 'Lewisham',
    poplar: 'Poplar',
    stepneyGreen: 'Stepney Green',
    walthamstow: 'Walthamstow',
  }

  const locationsArray = [
    'canningTown',
    'epsom',
    'hayes',
    'lewisham',
    'poplar',
    'stepneyGreen',
    'walthamstow',
  ]

  const reasons = {
    cost: 'Cost',
    commute: 'Commute Distance',
    travelLinks: 'Travel Links',
  }

  const locationPieData = [['Location', 'Number of Entries']]
  for (let key in tallyData.location) {
    locationPieData.push([`${locations[key]}`, tallyData.location[key]])
  }

  const reasonPieData = [['Reason', 'Number of Entries']]
  for (let key in tallyData.reason) {
    reasonPieData.push([`${reasons[key]}`, tallyData.reason[key]])
  }

  const selectedLocationChartData = []
  if (selectedLocation) {
    selectedLocationChartData.push([
      `${mapLocationKeyNameToDisplayableStr(selectedLocation)}`,
      'Reasons',
    ])
    for (let [key, value] of Object.entries(tallyData[selectedLocation]))
      selectedLocationChartData.push([`${key}`, value])
  }
  console.log(selectedLocationChartData)

  const chartEvents = [
    {
      eventName: 'select',
      callback({ chartWrapper }) {
        const selectedRow = chartWrapper.getChart().getSelection()[0].row
        const location = locationsArray[selectedRow]
        mapReasonsToLocationCb(fbData, location)
        setSelectedLocation(location)
      },
    },
  ]

  return (
    <>
      <Button onClick={() => mapReasonsToLocationCb(fbData, 'canningTown')}>
        Generate Reasons for Location
      </Button>
      <div className={styles.wrapper}>
        <Chart
          className={styles.pieChart}
          width={'30vw'}
          height={'30vh'}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={locationPieData}
          options={{
            title: 'Total Feedback Data Distribution',
          }}
          chartEvents={chartEvents}
        />
        <Chart
          width={'30vw'}
          height={'30vh'}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={reasonPieData}
          options={{
            title: 'Total Reasons Given From Feedback',
          }}
        />

        {selectedLocation ? (
          <Chart
            className={styles.pieChart}
            width={'30vw'}
            height={'30vh'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={selectedLocationChartData}
            chartEvents={chartEvents}
            options={{
              title: `${mapLocationKeyNameToDisplayableStr(
                selectedLocation
              )} Reasons`,
            }}
          />
        ) : null}
      </div>
    </>
  )
}

export default Pie
