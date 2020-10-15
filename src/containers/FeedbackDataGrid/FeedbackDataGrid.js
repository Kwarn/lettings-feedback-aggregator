import React, { useState, useEffect } from 'react'
import {
  mapLocationKeyNameToDisplayableName,
  mapReasonKeyNameToDisplayableName,
} from '../../shared/Utility'
import { DataGrid } from '@material-ui/data-grid'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
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

const FeedbackDataGrid = ({ fbData }) => {
  const styles = useStyles()
  const [rows, setRows] = useState(null)

  useEffect(() => {
    const rows = []
    for (let fb in fbData) {
      rows.push({
        id: fb,
        col1: fbData[fb].viewingDate,
        col2: mapLocationKeyNameToDisplayableName(fbData[fb].location),
        col3: fbData[fb].flatNumber,
        col4: fbData[fb].applicantName,
        col5: mapReasonKeyNameToDisplayableName(fbData[fb].reason),
        col6: fbData[fb].notes,
      })
    }
    setRows(rows)
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

  return (
    // <div className={styles.wrapper}>
    <div style={{ height: 600, width: '100%' }}>
      {rows ? (
        <DataGrid rows={rows} columns={columns} />
      ) : (
        <h1>loading data..</h1>
      )}
    </div>
    // </div>
  )
}

export default FeedbackDataGrid
