import React from 'react'
import Scenes from './Scenes'
import Graph from './Graph'
import { connect } from 'react-redux'


const App = props => {
  return (
    <div className="container">
      <h1 className="title is-1 main-title">Text adventure game maker</h1>
      <div className=" tree-container">
        {props.graph.ready && <Graph />}
      </div>
      <div>
      <Scenes />
      </div>
    </div>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(App)