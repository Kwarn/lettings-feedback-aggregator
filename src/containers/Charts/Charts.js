import React from 'react'
import { connect } from 'react-redux'
import Pie from './Pie/Pie'
import * as actions from '../../store/actions/index'

const Charts = ({ fbData, tallyData, onMapReasonsToLocation }) => {
  return (
    <div className={null}>
      {fbData ? (
        <Pie
          fbData={fbData}
          tallyData={tallyData}
          mapReasonsToLocationCb={(fbData, location) =>
            onMapReasonsToLocation(fbData, location)
          }
        />
      ) : null}
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
    onMapReasonsToLocation: (fbData, location) =>
      dispatch(actions.mapReasonsToLocation(fbData, location)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Charts)
