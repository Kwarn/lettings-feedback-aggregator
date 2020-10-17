import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import lostSalesDataReducer from './store/reducers/lostSalesData'
import lostSalesTallyDataReducer from './store/reducers/lostSalesTallyData'
import pendingSalesDataReducer from './store/reducers/pendingSalesData'
import pendingSalesTallyDataReducer from './store/reducers/pendingSalesTallyData'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import {
  watchLostSalesData,
  watchLostSalesTallyData,
  watchPendingSalesData,
  watchPendingSalesTallyData,
} from './store/sagas'

const rootReducer = combineReducers({
  lostSalesData: lostSalesDataReducer,
  lostSalesTallyData: lostSalesTallyDataReducer,
  pendingSalesData: pendingSalesDataReducer,
  pendingSalesTallyData: pendingSalesTallyDataReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
)
sagaMiddleware.run(watchLostSalesData)
sagaMiddleware.run(watchLostSalesTallyData)
sagaMiddleware.run(watchPendingSalesData)
sagaMiddleware.run(watchPendingSalesTallyData)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
