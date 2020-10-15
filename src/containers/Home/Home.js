import React, { useState, useEffect } from 'react'
import axios from '../../shared/axios-feedback'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Form from '../Form/Form'
import Button from '@material-ui/core/Button'
import FeedbackDataGrid from '../FeedbackDataGrid/FeedbackDataGrid'
import Charts from '../Charts/Charts'

// compounding search criteria on date, location
// incomplete inputs are added to seperate database

const defaultTallies = {
  location: {
    lewisham: 0,
    poplar: 0,
    canningTown: 0,
    epsom: 0,
    walthamstow: 0,
    hayes: 0,
    stepneyGreen: 0,
  },
  reason: {
    cost: 0,
    travelLinks: 0,
    commute: 0,
  },
}

const Home = ({ onFetchFeedbackData, onFetchTallyData, fbData, tallyData }) => {
  const [shouldFeedbackUpdate, setShouldFeedbackUpdate] = useState(false)

  function toggleShouldFeedbackUpdate() {
    setShouldFeedbackUpdate(!shouldFeedbackUpdate)
  }
  function resetTallyDatabase() {
    axios.put('/tallies.json', defaultTallies)
  }

  useEffect(() => {
    console.log('fb.shouldRefetch', fbData.shouldRefetchFeedbackData)
    if (fbData.shouldRefetchFeedbackData) {
      onFetchFeedbackData()
      onFetchTallyData()
    }
  }, [
    shouldFeedbackUpdate,
    onFetchFeedbackData,
    onFetchTallyData,
    fbData.shouldRefetchFeedbackData,
  ])

  return (
    <div>
      <Button onClick={() => resetTallyDatabase()}>Reset Tally Data</Button>
      <Button onClick={() => onFetchFeedbackData()}>fetchFeebackData</Button>
      <Button onClick={() => onFetchTallyData()}>fetchTallyData</Button>
      <div className={null}>
        {tallyData ? (
          <Form
            tallyData={tallyData}
            toggleShouldUpdateCallback={toggleShouldFeedbackUpdate}
          />
        ) : (
          <div>Loading..</div>
        )}
      </div>
      <div className={null}>
        {fbData ? (
          <FeedbackDataGrid
            fbData={fbData}
            toggleShouldUpdateCallback={toggleShouldFeedbackUpdate}
            shouldUpdate={shouldFeedbackUpdate}
          />
        ) : (
          <h2>Loading Data..</h2>
        )}
      </div>
      <div className={null}>
        {tallyData ? <Charts tallyData={tallyData} /> : <h2>Loading Charts</h2>}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    fbData: state.fbData,
    tallyData: state.tallyData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchFeedbackData: () => dispatch(actions.fetchFeedbackData()),
    onFetchTallyData: () => dispatch(actions.fetchTallyData()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
