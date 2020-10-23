import React, { useEffect } from 'react'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import LostSalesInputForm from './LostSalesInputForm/LostSalesInputForm'
import Charts from '../Charts/Charts'
import SalesDataGrid from '../SalesDataGrid/SalesDataGrid'
import _ from 'lodash'

// compounding search criteria on date, location
// incomplete inputs are added to seperate database

const DATA_GROUP_IDENTIFIER = 'LOST_SALES'

const LostSales = ({
  onPutSalesTallyData,
  onDeleteSalesDataEntries,
  onFetchSalesData,
  onFetchSalesTallyData,
  lostSalesData,
  lostSalesTallyData,
}) => {
  useEffect(() => {
    onFetchSalesData(DATA_GROUP_IDENTIFIER)
    onFetchSalesTallyData(DATA_GROUP_IDENTIFIER)
  }, [onFetchSalesData, onFetchSalesTallyData])

  const content = (
    <div>
      <div className={null}>
        <LostSalesInputForm
          dataGroupIdentifier={DATA_GROUP_IDENTIFIER}
          lostSalesTallyData={lostSalesTallyData}
        />
        <div>Loading..</div>
      </div>
      <div className={null}>
        <SalesDataGrid
          dataGroupIdentifier={DATA_GROUP_IDENTIFIER}
          salesData={lostSalesData}
          tallyData={lostSalesTallyData}
          putSalesTallyDataCb={(dataGroupIdentifier, updatedTallyData) =>
            onPutSalesTallyData(dataGroupIdentifier, updatedTallyData)
          }
          deleteSalesDataEntriesCb={(
            dataGroupIdentifier,
            salesDataIdsPendingDelete
          ) =>
            onDeleteSalesDataEntries(
              dataGroupIdentifier,
              salesDataIdsPendingDelete
            )
          }
        />
      </div>
      <div className={null}>
        {/* {lostSalesData ? (
          <Charts salesData={lostSalesData} tallyData={lostSalesTallyData} />
        ) : null} */}
      </div>
    </div>
  )

  return content
}

const mapStateToProps = state => {
  return {
    lostSalesData: state.salesData.lostSalesData,
    lostSalesTallyData: state.salesTallyData.lostSalesTallyData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchSalesData: dataGroupIdentifier =>
      dispatch(actions.fetchSalesData(dataGroupIdentifier)),
    onFetchSalesTallyData: dataGroupIdentifier =>
      dispatch(actions.fetchSalesTallyData(dataGroupIdentifier)),
    onPutSalesTallyData: (dataGroupIdentifier, updatedTallyData) =>
      dispatch(
        actions.putSalesTallyData(dataGroupIdentifier, updatedTallyData)
      ),
    onDeleteSalesDataEntries: (
      dataGroupIdentifier,
      salesDataIdsPendingDelete
    ) =>
      dispatch(
        actions.deleteSalesDataEntries(
          dataGroupIdentifier,
          salesDataIdsPendingDelete
        )
      ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LostSales)
