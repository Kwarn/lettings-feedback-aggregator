import React from 'react'
import Layout from './hoc/Layout/Layout'
import Home from './containers/Home/Home'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Layout>
          <Home/>
        </Layout>
      </header>
    </div>
  )
}

export default App
