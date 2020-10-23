import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import salesDataReducer from './store/reducers/salesData'
import salesTallyDataReducer from './store/reducers/salesTallyData'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { watchSalesData, watchSalesTallyData } from './store/sagas'

const rootReducer = combineReducers({
  salesData: salesDataReducer,
  salesTallyData: salesTallyDataReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
)
sagaMiddleware.run(watchSalesData)
sagaMiddleware.run(watchSalesTallyData)

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
