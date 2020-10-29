import * as actionTypes from '../actions/actionTypes';
import produce from 'immer';

const initalState = {
  // lostSalesData: {},
  // pendingSalesData: {},
  // completedSalesData: {},
};

const paths = {
  LOST_SALES: 'lostSalesData',
  PENDING_SALES: 'pendingSalesData',
  COMPLETED_SALES: 'completedSalesData',
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SALES_DATA_SUCCESS:
      return produce(state, draft => {
        draft[paths[action.payload.dataGroupIdentifier]] =
          action.payload.salesData;
      });

    case actionTypes.POST_SALES_DATA_SUCCESS:
      return produce(state, draft => {
        draft[paths[action.payload.dataGroupIdentifier]] = Object.assign(
          draft[paths[action.payload.dataGroupIdentifier]],
          action.payload.newSalesDataEntry
        );
      });

    case actionTypes.DELETE_SALES_DATA_ENTRIES_SUCCESS:
      return produce(state, draft => {
        action.payload.deletedSalesDataIdsArray.forEach(id => {
          delete draft[paths[action.payload.dataGroupIdentifier]][id];
        });
      });
    default:
      return state;
  }
};

export default reducer;
