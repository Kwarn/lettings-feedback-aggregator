import React, { useEffect } from 'react'
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
  function resetTallyDatabase() {
    axios.put('/tallies.json', defaultTallies)
  }

  useEffect(() => {
    if (fbData.shouldRefetchFeedbackData) {
      onFetchFeedbackData()
      onFetchTallyData()
    }
  }, [onFetchFeedbackData, onFetchTallyData, fbData.shouldRefetchFeedbackData])

  return (
    <div>
      <div className={null}>
        {tallyData ? <Form tallyData={tallyData} /> : <div>Loading..</div>}
      </div>
      <div className={null}>
        <FeedbackDataGrid />
      </div>
      <div className={null}>
        {tallyData ? <Charts tallyData={tallyData} /> : <h2>Loading Charts</h2>}
      </div>
      <Button onClick={() => resetTallyDatabase()}>Reset Tally Data</Button>
      <Button onClick={() => onFetchFeedbackData()}>fetchFeebackData</Button>
      <Button onClick={() => onFetchTallyData()}>fetchTallyData</Button>
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
