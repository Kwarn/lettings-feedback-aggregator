import React, { useState, useEffect, memo } from 'react'
import * as utility from '../../shared/Utility'
import { DataGrid } from '@material-ui/data-grid'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

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
    margin: '100px 100px 100px 100px',
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

const SalesDataGrid = ({
  dataGroupIdentifier,
  salesData,
  tallyData,
  putSalesTallyDataCb,
  deleteSalesDataEntriesCb,
}) => {
  const styles = useStyles()
  const [rows, setRows] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const tallyDeletedRows = () => {
    function tally(arr) {
      return arr.reduce((acc, curr) => {
        typeof acc[curr] === 'undefined' ? (acc[curr] = 1) : (acc[curr] += 1)
        return acc
      }, {})
    }

    const key1 =
      dataGroupIdentifier === 'PENDING_SALES'
        ? 'location'
        : dataGroupIdentifier === 'LOST_SALES'
        ? 'location'
        : ''
    const key2 =
      dataGroupIdentifier === 'PENDING_SALES'
        ? 'flatNumber'
        : dataGroupIdentifier === 'LOST_SALES'
        ? 'reason'
        : ''

    let tally1 = {}
    let tally2 = {}

    if (dataGroupIdentifier === 'PENDING_SALES') {
      tally1 = tally(
        selectedRows.map(row => utility.convertStrToKeyName[row.col2])
      )
      tally2 = tally(selectedRows.map(row => row.col3))
    }

    if (dataGroupIdentifier === 'LOST_SALES') {
      tally1 = tally(
        selectedRows.map(row => utility.convertStrToKeyName[row.col2])
      )
      tally2 = tally(
        selectedRows.map(row => utility.convertStrToKeyName[row.col5])
      )
    }

    return {
      [key1]: { ...tally1 },
      [key2]: { ...tally2 },
    }
  }

  const deleteRowsHandler = () => {
    if (
      window.confirm(
        'Are you sure you wish to delete these items? DELETE IS PERMANENT'
      )
    ) {
      setRows(
        rows.filter(r => selectedRows.filter(sr => sr.id === r.id).length < 1)
      )
      const deletedTallyData = tallyDeletedRows()
      // const updatedTallyData = utility.updateTallyData(
      //   tallyData,
      //   deletedTallyData,
      //   'DECREMENT'
      // )
      const salesDataIdsPendingDelete = selectedRows.map(row => row.id)
      // putSalesTallyDataCb(updatedTallyData)
      deleteSalesDataEntriesCb(dataGroupIdentifier, salesDataIdsPendingDelete)
      setSelectedRows([])
    }
  }

  useEffect(() => {
    const rowsArr = []
    for (let id in salesData) {
      rowsArr.push({
        id: id,
        col1: salesData[id].viewingDate,
        col2: utility.convertKeyNameToStr[salesData[id].location],
        col3: salesData[id].flatNumber,
        col4: salesData[id].applicantName,
        col5: utility.convertKeyNameToStr[salesData[id].reason],
        col6: salesData[id].notes,
      })
    }
    setRows(rowsArr)
  }, [salesData])

  const columns = [
    { field: 'id', hide: true },
    { field: 'col1', headerName: 'Viewing Date', width: 150 },
    { field: 'col2', headerName: 'Location', width: 150 },
    { field: 'col3', headerName: 'Flat Number', width: 150 },
    { field: 'col4', headerName: 'Applicant Name', width: 150 },
    { field: 'col5', headerName: 'Reason', width: 150 },
    { field: 'col6', headerName: 'Notes', width: 150 },
  ]

  const dgOrLoading = rows ? (
    <DataGrid
      rows={rows}
      columns={columns}
      checkboxSelection
      onSelectionChange={e => setSelectedRows(e.rows)}
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

export default SalesDataGrid
