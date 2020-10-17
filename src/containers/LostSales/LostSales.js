import React, { useEffect } from 'react'
import axios from '../../shared/axios-feedback'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Form from './LostSalesInputForm/LostSalesInputForm'
import Button from '@material-ui/core/Button'
import LostSalesDataGrid from './LostSalesDataGrid/LostSalesDataGrid'
import Charts from '../Charts/Charts'
import * as utility from '../../shared/Utility'

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

const LostSales = ({
  onFetchLostSalesData,
  onFetchLostSalesTallyData,
  lostSalesData,
  lostSalesTallyData,
}) => {
  function resetTallyDatabase() {
    axios.put('/tallies.json', defaultTallies)
  }

  useEffect(() => {
    onFetchLostSalesData()
    onFetchLostSalesTallyData()
  }, [onFetchLostSalesData, onFetchLostSalesTallyData])

  return (
    <div>
      <div className={null}>
        {lostSalesTallyData ? (
          <Form lostSalesTallyData={lostSalesTallyData} />
        ) : (
          <div>Loading..</div>
        )}
      </div>
      <div className={null}>
        <LostSalesDataGrid />
      </div>
      <div className={null}>
        {lostSalesTallyData ? (
          <Charts data={lostSalesData} tallyData={lostSalesTallyData} />
        ) : (
          <h2>Loading Charts</h2>
        )}
      </div>
      <Button onClick={() => resetTallyDatabase()}>Reset Tally Data</Button>
      <Button onClick={() => onFetchLostSalesData()}>fetchFeebackData</Button>
      <Button onClick={() => onFetchLostSalesTallyData()}>
        fetchTallyData
      </Button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    lostSalesData: state.lostSalesData,
    lostSalesTallyData: state.lostSalesTallyData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchLostSalesData: () => dispatch(actions.fetchLostSalesData()),
    onFetchLostSalesTallyData: () =>
      dispatch(actions.fetchLostSalesTallyData()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LostSales)
