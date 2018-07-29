import React from 'react'
import Scenes from './Scenes'

const App = props => {
    return (
        <div className="container"> 
            <div className="hero">
            <div className="hero-body">
                <h1 className="title is-1">Text adventure game</h1>
            </div>   
            </div>
            <Scenes />
        </div>
    ) 
}

export default App