import React, { useState } from 'react'
import Chart from 'react-google-charts'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

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
  const locationPieData = [['Location', 'Number of Entries']]
  for (let key in tallyData.location) {
    locationPieData.push([
      `${tallyData.convertKeyNameToStr[key]}`,
      tallyData.location[key],
    ])
  }

  const reasonPieData = [['Reason', 'Number of Entries']]
  for (let key in tallyData.reason) {
    reasonPieData.push([
      `${tallyData.convertKeyNameToStr[key]}`,
      tallyData.reason[key],
    ])
  }

  const selectedLocationChartData = []
  if (selectedLocation) {
    selectedLocationChartData.push([
      `${tallyData.convertKeyNameToStr[selectedLocation]}`,
      'Reasons',
    ])
    for (let [key, value] of Object.entries(tallyData[selectedLocation])) {
      selectedLocationChartData.push([
        `${tallyData.convertKeyNameToStr[key]}`,
        value,
      ])
    }
  }

  const chartEvents = [
    {
      eventName: 'select',
      callback({ chartWrapper }) {
        const selectedRow = chartWrapper.getChart().getSelection()[0].row
        const location =
          tallyData.orderedLocationKeyNameStringsArray[selectedRow]
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
          width={'40vw'}
          height={'40vh'}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={locationPieData}
          options={{
            title: 'Total Feedback Data Distribution',
          }}
          chartEvents={chartEvents}
        />
        <Chart
          width={'40vw'}
          height={'40vh'}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={reasonPieData}
          options={{
            title: 'Total Reasons Given From Feedback',
          }}
        />
      </div>
      <div className={styles.wrapper}>
        {selectedLocation ? (
          <Chart
            className={styles.pieChart}
            width={'40vw'}
            height={'40vh'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={selectedLocationChartData}
            chartEvents={chartEvents}
            options={{
              title: `${tallyData.convertKeyNameToStr[selectedLocation]} Reasons`,
            }}
          />
        ) : null}
      </div>
    </>
  )
}

export default Pie
