import {CURRENT_SCENE_ID, RECEIVE_SCENE} from '../actions/scene'



export default function (state = {}, action) {

    switch(action.type) {
      case CURRENT_SCENE_ID:
        return {
           currentSceneId : action.id
        }
      case RECEIVE_SCENE: 
        return action.scene
      default:
        return state
    }
  }

const getDirections = scene => {
  const {currentScene} = scene
  let directions = {
    north: currentScene.north,
    east: currentScene.east,
    south: currentScene.south,
    west: currentScene.west,
    northeast: currentScene.northeast,
    southeast: currentScene.southeast,
    southwest: currentScene.southwest,
    northwest: currentScene.northwest
  }
  currentScene.directions = directions
  getPaths(currentScene)
}

const getPaths = directions => {
  directions.definedPaths = Object.keys(directions).filter((direction => {
    return directions[direction] 
  }))
  directions.undefinedPaths = Object.keys(directions).filter((direction) => {
    return !directions[direction]
  })

  console.log(directions)
 
  return directions
}