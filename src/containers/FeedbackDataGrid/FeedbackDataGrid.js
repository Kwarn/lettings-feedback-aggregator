import React from 'react'
import { DataGrid } from '@material-ui/data-grid'
import classes from './FeedbackDataGrid.module.css'

const FeedbackDataGrid = ({ feedbackData }) => {
  function populateDataGrid() {
    for (let fb in feedbackData) {
      rows.push({
        id: fb,
        col1: feedbackData[fb].viewingDate,
        col2: feedbackData[fb].location,
        col3: feedbackData[fb].flatNumber,
        col4: feedbackData[fb].applicantName,
        col5: feedbackData[fb].reason,
        col6: feedbackData[fb].notes,
      })
    }
  }
  const rows = []
  const columns = [
    { field: 'id', hide: true },
    { field: 'col1', headerName: 'Viewing Date', width: 150 },
    { field: 'col2', headerName: 'Location', width: 150 },
    { field: 'col3', headerName: 'Flat Number', width: 150 },
    { field: 'col4', headerName: 'Applicant Name', width: 150 },
    { field: 'col5', headerName: 'Reason', width: 150 },
    { field: 'col6', headerName: 'Notes', width: 150 },
  ]

  if (feedbackData) populateDataGrid()

  return (
    // <div className={classes.Wrapper}>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
        />
      </div>
    // </div>
  )
}

export default FeedbackDataGrid
