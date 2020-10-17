import React, { useEffect } from 'react'
import axios from '../../shared/axios-feedback'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Form from '../LostSales/LostSalesInputForm/LostSalesInputForm'
import Button from '@material-ui/core/Button'
import FeedbackDataGrid from '../FeedbackDataGrid/FeedbackDataGrid'
import Charts from '../Charts/Charts'

// compounding search criteria on date, location
// incomplete inputs are added to seperate database

const Home = ({
  onFetchLostSalesData,
  onLostSalesData,
  lostSalesData,
  lostSalesTallyData,
}) => {
  return (
    <div>
      <h2>Home</h2>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
