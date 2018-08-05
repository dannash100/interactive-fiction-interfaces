import { CURRENT_SCENE_ID, RECEIVE_SCENE} from '../actions/scene'


export default function (state = {}, action) {

  switch (action.type) {
    case CURRENT_SCENE_ID:
      return {
        currentSceneId: action.id
      }
    case RECEIVE_SCENE:
      return sceneWithDirections(action.scene)
    default:
      return state
  }
}

const sceneWithDirections = scene => {
  let directions = {
    north: scene.north,
    east: scene.east,
    south: scene.south,
    west: scene.west,
    northeast: scene.northeast,
    southeast: scene.southeast,
    southwest: scene.southwest,
    northwest: scene.northwest
  }
  scene.directions = directions
  directions = getPaths(directions)
  return scene
}

const getPaths = directions => {
  directions.definedPaths = Object.keys(directions)
    .filter(direction => {
      return directions[direction]
    })
    .map(direction => {
      return {
        [direction]: directions[direction]
      }
    })
  directions.undefinedPaths = Object.keys(directions).filter(direction => {
    return !directions[direction]
  })
}