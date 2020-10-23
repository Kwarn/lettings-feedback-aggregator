import React, { useEffect } from 'react'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import PendingSalesInputForm from './PendingSalesInputForm/PendingSalesInputForm'
import SalesDataGrid from '../SalesDataGrid/SalesDataGrid'
import Charts from '../Charts/Charts'

const PendingSales = ({
  pendingSalesData,
  pendingSalesTallyData,
  onPutSalesTallyData,
  onDeleteSalesDataEntries,
  onFetchSalesData,
  onFetchSalesTallyData,
}) => {
  useEffect(() => {
    onFetchSalesData()
    onFetchSalesTallyData()
  }, [onFetchSalesData, onFetchSalesTallyData])
  return (
    <div>
      <div className={null}>
        {pendingSalesTallyData ? (
          <PendingSalesInputForm
            pendingSalesTallyData={pendingSalesTallyData}
          />
        ) : (
          <div>Loading..</div>
        )}
      </div>
      <div className={null}>
        <SalesDataGrid
          salesDataType="pending"
          salesData={pendingSalesData}
          tallyData={pendingSalesTallyData}
          putSalesTallyDataCb={updatedTallyData =>
            onPutSalesTallyData(updatedTallyData)
          }
          deleteSalesDataEntriesCb={entries =>
            onDeleteSalesDataEntries(entries)
          }
        />
      </div>
      <div className={null}>
        {pendingSalesTallyData ? (
          <Charts
            salesData={pendingSalesData}
            tallyData={pendingSalesTallyData}
          />
        ) : (
          <h2>Loading Charts</h2>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    salesData: state.salesData,
    salesTallyData: state.salesTallyData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchSalesData: () => dispatch(actions.fetchSalesData()),
    onFetchSalesTallyData: () => dispatch(actions.fetchSalesTallyData()),
    onPutSalesTallyData: updatedTallyData =>
      dispatch(actions.putSalesTallyData(updatedTallyData)),
    onDeleteSalesDataEntries: entries =>
      dispatch(actions.deleteSalesDataEntries(entries)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingSales)
