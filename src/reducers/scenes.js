import {RECEIVE_SCENES} from '../actions/scenes'

export default function (state = [], action) {

    switch(action.type) {
      case RECEIVE_SCENES:
        return action.scenes
      default:
        return state
    }
  }