import React, { useState, useEffect } from 'react'
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

const FeedbackDataGrid = ({ feedbackData }) => {
  const styles = useStyles()
  const [rows, setRows] = useState([])
  useEffect(() => {
    const rows = []
    for (let fb in feedbackData) {
      rows.push({
        id: fb,
        col1: feedbackData[fb].viewingDate,
        col2: locations[feedbackData[fb].location],
        col3: feedbackData[fb].flatNumber,
        col4: feedbackData[fb].applicantName,
        col5: reasons[feedbackData[fb].reason],
        col6: feedbackData[fb].notes,
      })
    }
    setRows(rows)
  }, [feedbackData])

  const locations = {
    poplar: 'Poplar',
    canningTown: 'Canning Town',
    epsom: 'Epsom',
    lewisham: 'Lewisham',
    walthamstow: 'Walthamstow',
    hayes: 'Hayes',
    stepneyGreen: 'Stepney Green',
  }
  const reasons = {
    cost: 'Cost',
    commute: 'Commute Distance',
    travelLinks: 'Travel Links',
  }

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
    <div className={styles.wrapper}>
      <div style={{ height: 600, width: '100%', margin: "100px" }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </div>
  )
}

export default FeedbackDataGrid
