import React, { useState, useEffect } from 'react'
import * as utility from '../../../shared/Utility'
import { DataGrid } from '@material-ui/data-grid'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import * as actions from '../../../store/actions'
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
  lostSalesData,
  lostSalesTallyData,
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
      rowsSelectedForDelete.map(row => utility.convertStrToKeyName[row.col2])
    )
    const reasonsTally = tally(
      rowsSelectedForDelete.map(row => utility.convertStrToKeyName[row.col5])
    )

    return {
      location: { ...locationsTally },
      reason: { ...reasonsTally },
    }
  }

  const deleteRowsHandler = () => {
    console.log(lostSalesTallyData)
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
      const updatedTallyData = utility.updateTallyData(
        lostSalesTallyData,
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
    for (let id in lostSalesData) {
      rowsArr.push({
        id: id,
        col1: lostSalesData[id].viewingDate,
        col2: utility.convertKeyNameToStr[lostSalesData[id].location],
        col3: lostSalesData[id].flatNumber,
        col4: lostSalesData[id].applicantName,
        col5: utility.convertKeyNameToStr[lostSalesData[id].reason],
        col6: lostSalesData[id].notes,
      })
    }
    setRows(rowsArr)
  }, [lostSalesData])

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
    lostSalesTallyData: state.lostSalesTallyData,
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
