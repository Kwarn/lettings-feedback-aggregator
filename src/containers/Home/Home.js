import React, { useEffect } from 'react'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'

// compounding search criteria on date, location
// incomplete inputs are added to seperate database

const Home = ({ onFetchSalesData, onSalesData, salesData, salesTallyData }) => {
  return (
    <div>
      <h2>Home</h2>
    </div>
  )
}

// useEffect(() => {
//   onFetchAllData()
//   return () => {
//     cleanup
//   }
// }, [input])

const mapStateToProps = state => {
  return {
    salesData: state.salesData,
    salesTallyData: state.salesTallyData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchSalesData: () => dispatch(actions.fetchSalesData()),
    onFetchSalesTallyData: () => dispatch(actions.fetchSalesTallyData()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
