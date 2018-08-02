import React from 'react';
import { connect } from 'react-redux'
import scene from '../reducers/scene';




class SceneView extends React.Component {

  state = {

  }
  componentDidMount() {
    // const getDirections = scene => {
    //   const {currentScene} = scene
    //   let directions = {
    //     north: currentScene.north,
    //     east: currentScene.east,
    //     south: currentScene.south,
    //     west: currentScene.west,
    //     northeast: currentScene.northeast,
    //     southeast: currentScene.southeast,
    //     southwest: currentScene.southwest,
    //     northwest: currentScene.northwest
    //   }
    //   currentScene.directions = directions
    //   getPaths(currentScene)
    // }
    
    // const getPaths = directions => {
    //   directions.definedPaths = Object.keys(directions).filter((direction => {
    //     return directions[direction] 
    //   }))
    //   directions.undefinedPaths = Object.keys(directions).filter((direction) => {
    //     return !directions[direction]
    //   })
  }

  

  render() {
    const scenes = this.props.scenes
    return (
      <div>
       
      </div>
    )
  }

}

const mapStateToProps = state => {scene}

export default connect(mapStateToProps)(SceneView)