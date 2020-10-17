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
  lostSalesData: lostSalessData,
  tallyData,
  onDeleteRows,
  onPutLostSalesTallyData,
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
      onPutLostSalesTallyData(updatedTallyData)
      onDeleteRows(rowsSelectedForDelete)
      setRowsSelectedForDelete([])
    }
  }

  useEffect(() => {
    const rowsArr = []
    for (let id in lostSalessData) {
      if (id !== 'shouldRefetchFeedbackData')
        rowsArr.push({
          id: id,
          col1: lostSalessData[id].viewingDate,
          col2: mapLocationKeyNameToDisplayableStr(lostSalessData[id].location),
          col3: lostSalessData[id].flatNumber,
          col4: lostSalessData[id].applicantName,
          col5: mapReasonKeyNameToDisplayableStr(lostSalessData[id].reason),
          col6: lostSalessData[id].notes,
        })
    }
    setRows(rowsArr)
  }, [lostSalessData])

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
    lostSalesData: state.lostSalesData,
    lostSalesTallyData: state.failedApplicantTallyData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDeleteRows: entries =>
      dispatch(actions.deleteLostSalesDataEntries(entries)),
    onPutLostSalesTallyData: updatedLostSalesTallyData =>
      dispatch(actions.putLostSalesTallyData(updatedLostSalesTallyData)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackDataGrid)
