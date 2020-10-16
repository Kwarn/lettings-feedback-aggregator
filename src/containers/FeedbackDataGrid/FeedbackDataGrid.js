import React, { useState, useEffect } from 'react'
import {
  mapLocationDisplayStrToKeyName,
  mapLocationKeyNameToDisplayableStr,
  mapReasonDisplayStrToKeyName,
  mapReasonKeyNameToDisplayableStr,
  updateTallyData,
} from '../../shared/Utility'
import { DataGrid } from '@material-ui/data-grid'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#1C1C1C',
  },
  dataGrid: {
    backgroundColor: '#FAFAFF',
    height: 600,
    width: '100%',
    margin: '100px 300px 100px 300px',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxHeight: 50,
  },
}))

const FeedbackDataGrid = ({
  fbData,
  tallyData,
  onDeleteRows,
  onPostTallyData,
}) => {
  const styles = useStyles()
  const [rows, setRows] = useState([])
  const [rowsSelectedForDelete, setRowsSelectedForDelete] = useState([])

  const tallyDeletedRows = () => {
    function tally(arr) {
      return arr.reduce((acc, curr) => {
        typeof acc[curr] === 'undefined' ? (acc[curr] = 1) : (acc[curr] += 1)
        return acc
      }, {})
    }
    const locationsTally = tally(
      rowsSelectedForDelete.map(row => mapLocationDisplayStrToKeyName(row.col2))
    )
    const reasonsTally = tally(
      rowsSelectedForDelete.map(row => mapReasonDisplayStrToKeyName(row.col5))
    )

    return {
      location: { ...locationsTally },
      reason: { ...reasonsTally },
    }
  }

  const deleteRowsHandler = () => {
    if (
      window.confirm(
        'Are you sure you wish to delete these items? DELETE IS PERMANENT'
      )
    ) {
      setRows(
        rows.filter(
          r => rowsSelectedForDelete.filter(sr => sr.id === r.id).length < 1
        )
      )
      const deletedTallyData = tallyDeletedRows()
      const updatedTallyData = updateTallyData(
        tallyData,
        deletedTallyData,
        'DECREMENT'
      )
      onPostTallyData(updatedTallyData)
      onDeleteRows(rowsSelectedForDelete)
      setRowsSelectedForDelete([])
    }
  }

  useEffect(() => {
    const rowsArr = []
    for (let fb in fbData) {
      if (fb !== 'shouldRefetchFeedbackData')
        rowsArr.push({
          id: fb,
          col1: fbData[fb].viewingDate,
          col2: mapLocationKeyNameToDisplayableStr(fbData[fb].location),
          col3: fbData[fb].flatNumber,
          col4: fbData[fb].applicantName,
          col5: mapReasonKeyNameToDisplayableStr(fbData[fb].reason),
          col6: fbData[fb].notes,
        })
    }
    setRows(rowsArr)
  }, [fbData])

  const columns = [
    { field: 'id', hide: true },
    { field: 'col1', headerName: 'Viewing Date', width: 150 },
    { field: 'col2', headerName: 'Location', width: 150 },
    { field: 'col3', headerName: 'Flat Number', width: 150 },
    { field: 'col4', headerName: 'Applicant Name', width: 150 },
    { field: 'col5', headerName: 'Reason', width: 150 },
    { field: 'col6', headerName: 'Notes', width: 150 },
  ]
  const data = { ...rows, ...columns }

  const dgOrLoading = rows ? (
    <DataGrid
      rows={rows}
      columns={columns}
      checkboxSelection
      onSelectionChange={e => setRowsSelectedForDelete(e.rows)}
    />
  ) : (
    <h1>loading data..</h1>
  )

  return (
    <div className={styles.wrapper}>
      <div className={styles.dataGrid}>
        {dgOrLoading}
        <Button variant="contained" color="primary" onClick={deleteRowsHandler}>
          Delete Selected
        </Button>
      </div>
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
    onDeleteRows: entries => dispatch(actions.deleteFbDataEntries(entries)),
    onPostTallyData: updatedTallyData =>
      dispatch(actions.postTallyData(updatedTallyData)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackDataGrid)
