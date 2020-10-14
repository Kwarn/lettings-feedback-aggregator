import React, { useState, useEffect } from 'react'
import Form from '../Form/Form'
import axios from '../../shared/axios-feedback'
import Button from '@material-ui/core/Button'
import { getFeedbackData, getTallies } from '../../shared/getData'
import FeedbackDataGrid from '../FeedbackDataGrid/FeedbackDataGrid'
import Charts from '../Charts/Charts'

const Home = () => {
  const [shouldFeedbackUpdate, setShouldFeedbackUpdate] = useState(false)
  const [feedbackData, setFeedbackData] = useState(null)
  const [tallies, setTallies] = useState(null)

  function toggleShouldFeedbackUpdate() {
    setShouldFeedbackUpdate(!shouldFeedbackUpdate)
  }

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

  function resetTallyDatabase() {
    axios.put('/tallies.json', defaultTallies)
  }

  useEffect(() => {
    getFeedbackData()
      .then(data => setFeedbackData(data))
      .catch(err => console.log(err))
    if (!tallies) {
      getTallies()
        .then(data => setTallies(data))
        .catch(err => console.log(err))
    }
  }, [shouldFeedbackUpdate])

  return (
    <div>
      <Button onClick={resetTallyDatabase}>Test</Button>
      <div className={null}>
        {tallies ? (
          <Form
            tallies={tallies}
            toggleShouldUpdateCallback={toggleShouldFeedbackUpdate}
          />
        ) : (
          <div>Loading..</div>
        )}
      </div>
      <div className={null}>
        {feedbackData ? (
          <FeedbackDataGrid
            feedbackData={feedbackData}
            toggleShouldUpdateCallback={toggleShouldFeedbackUpdate}
            shouldUpdate={shouldFeedbackUpdate}
          />
        ) : (
          <h2>Loading Data..</h2>
        )}
      </div>
      <div className={null}>
        {tallies ? <Charts tallies={tallies} /> : <h2>Loading Charts</h2> }
        
      </div>
    </div>
  )
}

export default Home
