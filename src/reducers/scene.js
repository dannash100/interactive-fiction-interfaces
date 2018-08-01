import {CURRENT_SCENE} from '../actions/scene'


export default function (state = [], action) {

    switch(action.type) {
      case CURRENT_SCENE:
        return {
           currentScene : action.id
        }
      default:
        return state
    }
  }