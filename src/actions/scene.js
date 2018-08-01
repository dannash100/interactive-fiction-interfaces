import {postScene} from "../api/game"

export const CURRENT_SCENE = "CURRENT_SCENE"
export const ERROR = "ERROR"

export const currentScene = id => {
    return {
        type: CURRENT_SCENE,
        id
      }
}

export const newScene = (sceneName) => dispatch => {
    return postScene(sceneName)
      .then(res => {
        let id = res.body[0]
        dispatch(currentScene(id))
      })
      .catch(err => {
        dispatch(error(err.message))
      })
  }
  