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


