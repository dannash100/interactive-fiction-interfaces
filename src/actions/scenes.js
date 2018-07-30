import {getScenes} from "../api/game"

export const REQUEST_SCENES = "REQUEST_SCENES"
export const RECEIVE_SCENES = "RECEIVE_SCENES"
export const ERROR = "ERROR"

const requestScenes = () => {
  return {
    type: REQUEST_SCENES
  }
}

const receiveScenes = (scenes) => {
  return {
    type: RECEIVE_SCENES,
    scenes
  }
}

const error = error => {
  return {
    type: ERROR,
    error
  }
}

export const fetchScenes = () => dispatch => {
  dispatch(requestScenes())
  return getScenes()
    .then(res => {
      let scenes = res.body
      dispatch(receiveScenes(scenes))
    })
    .catch(err => {
      dispatch(error(err.message))
    })
}

