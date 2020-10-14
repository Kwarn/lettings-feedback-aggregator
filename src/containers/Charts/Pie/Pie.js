import React from 'react'
import Chart from 'react-google-charts'

const Pie = ({data}) => {
  console.log(data)
  return (
    <div>
      <Chart
        width={'50vw'}
        height={'50vh'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[
          ['Reason', 'Number Of Reasons'],
          ['Cost', 15],
          ['Eat', 2],
          ['Commute', 2],
          ['Watch TV', 2],
          ['Sleep', 7],
        ]}
        options={{
          title: 'My Daily Activities',
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </div>
  )
}

export default Pie
