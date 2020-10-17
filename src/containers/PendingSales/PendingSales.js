import React from 'react'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import PendingSalesInputForm from './PendingSalesInputForm/PendingSalesInputForm'

const PendingSales = () => {
  return (
    <div>
      <PendingSalesInputForm />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    pendingSaleData: state.pendingSaleData,
    pendingSalesTallyData: state.pendingSalesTallyData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDeleteRows: entries =>
      dispatch(actions.deletePendingSalesDataEntries(entries)),
    onPutNewApplicantTallyData: updatedNewApplicantTallyData =>
      dispatch(actions.putPendingSalesTallyData(updatedNewApplicantTallyData)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingSales)
