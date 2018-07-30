import React from 'react'
import Scenes from './Scenes'
import Tree from './Tree'
import {connect} from 'react-redux'

const App = props => {
    return (
        <div className="container"> 
                <h1 className="title is-1 main-title">Text adventure game maker</h1>
            <div className="is-full-length tree-container">
           {props.graph.ready && <Tree />} 
            </div>
            <Scenes />
        </div>
    ) 
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(App)