import {postScene, getScene} from "../api/game"

export const CURRENT_SCENE_ID = "CURRENT_SCENE_ID"
export const RECEIVE_SCENE = "RECEIVE_SCENE"
export const ERROR = "ERROR"

export const currentSceneId = id => {
  return {
    type: CURRENT_SCENE_ID,
    id
  }
}

export const receiveScene = scene => {
  return {
    type: RECEIVE_SCENE,
    scene
  }
}

const error = error => {
  return {
    type: ERROR,
    error
  }
}

export const newScene = (sceneName) => dispatch => {
  return postScene(sceneName)
    .then(res => {
      let id = res.body[0]
      dispatch(currentSceneId(id))
    })
    .catch(err => {
      dispatch(error(err.message))
    })
}



export const fetchScene = sceneId => dispatch => {
  return getScene(sceneId)
    .then(res => {
      let scene = res.body
      dispatch(receiveScene(scene))
    })
    .catch(err => {
      dispatch(error(err.message))
    })
}