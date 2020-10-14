import React, { useState, useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import classes from './FeedbackDataGrid.module.css'

const FeedbackDataGrid = ({ feedbackData }) => {
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
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  )
}

export default FeedbackDataGrid
