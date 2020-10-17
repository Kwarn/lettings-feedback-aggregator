import React, { Suspense, useEffect } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Layout from './hoc/Layout/Layout'
import Home from './containers/Home/Home'
import Spinner from './components/UI/Spinner/Spinner'
import './App.css'
import PendingSales from './containers/PendingSales/PendingSales'
import CompletedSales from './containers/SuccessfulApplicants/SuccessfulApplicants'
import LostSales from './containers/LostSales/LostSales'

let routes = (
  <Switch>
    <Route
      path="/pending"
      render={() => (
        <Suspense fallback={<Spinner />}>
          <PendingSales />
        </Suspense>
      )}
    />
    <Route
      path="/completed"
      render={() => (
        <Suspense fallback={<Spinner />}>
          <CompletedSales />
        </Suspense>
      )}
    />
    <Route
      path="/lost"
      render={() => (
        <Suspense fallback={<Spinner />}>
          <LostSales />
        </Suspense>
      )}
    />
    <Route path="/" exact component={Home} />
    <Redirect to="/" />
  </Switch>
)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Layout>{routes}</Layout>
      </header>
    </div>
  )
}

export default App
