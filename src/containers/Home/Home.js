import React, { useState, useEffect } from 'react'
import Form from '../Form/Form'
import { getFeedbackData, getTallies } from '../../shared/getData'
import FeedbackDataGrid from '../FeedbackDataGrid/FeedbackDataGrid'
import Charts from '../Charts/Charts'
import classes from './Home.module.css'

const Home = () => {
  const [shouldFeedbackUpdate, setShouldFeedbackUpdate] = useState(false)
  const [feedbackData, setFeedbackData] = useState(null)
  const [tallies, setTallies] = useState(null)

  function toggleShouldFeedbackUpdate() {
    setShouldFeedbackUpdate(!shouldFeedbackUpdate)
  }

  useEffect(() => {
    getFeedbackData()
      .then(data => setFeedbackData(data))
      .catch(err => console.log(err))
    getTallies()
      .then(data => setTallies(data))
      .catch(err => console.log(err))
  }, [shouldFeedbackUpdate])

  return (
    <div>
      <div className={classes.SectionWrapper}>
        <Form toggleShouldUpdateCallback={toggleShouldFeedbackUpdate} />
      </div>
      <div className={classes.SectionWrapper}>
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
      <div className={classes.SectionWrapper}>
        {tallies ? (
          <Charts tallies={tallies} />
        ) : (
          <h2>Loading Data..</h2>
        )}
      </div>
    </div>
  )
}

export default Home
