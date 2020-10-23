import React from 'react'
import { connect } from 'react-redux'
import Pie from './Pie/Pie'
import * as actions from '../../store/actions/index'
import _ from 'lodash'

const Charts = ({ salesData, tallyData, onMapReasonsToLocation }) => {
  return (
    <div className={null}>
      <Pie
        salesData={salesData}
        tallyData={tallyData}
        mapReasonsToLocationCb={(salesData, location) =>
          onMapReasonsToLocation(salesData, location)
        }
      />
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    onMapReasonsToLocation: (salesData, location) =>
      dispatch(actions.mapReasonsToLocation(salesData, location)),
  }
}
export default connect(null, mapDispatchToProps)(Charts)
