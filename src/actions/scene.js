import {postScene, getScene, linkScene} from "../api/game"

export const CURRENT_SCENE_ID = "CURRENT_SCENE_ID"
export const RECEIVE_SCENE = "RECEIVE_SCENE"
export const RESET_FIELDS = "RESET_FIELDS"
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

export const resetFields = () => {
  return {
    type: RESET_FIELDS,
  }
}

const error = error => {
  return {
    type: ERROR,
    error
  }
}



export const newScene = (sceneName, linkId, direction) => dispatch => {
  return postScene(sceneName)
    .then(res => {
      let id = res.body[0]
      return linkScene(id, linkId, direction)
        .then(() => {
          console.log('hi')
            dispatch(currentSceneId(id))
            dispatch(resetFields())
        })
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