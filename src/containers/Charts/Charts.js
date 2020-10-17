import React from 'react'
import { connect } from 'react-redux'
import Pie from './Pie/Pie'
import * as actions from '../../store/actions/index'

const Charts = ({ data, tallyData, onMapReasonsToLocation }) => {
  return (
    <div className={null}>
      {data ? (
        <Pie
          data={data}
          tallyData={tallyData}
          mapReasonsToLocationCb={(data, location) =>
            onMapReasonsToLocation(data, location)
          }
        />
      ) : null}
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    onMapReasonsToLocation: (data, location) =>
      dispatch(actions.mapReasonsToLocation(data, location)),
  }
}
export default connect(null, mapDispatchToProps)(Charts)
