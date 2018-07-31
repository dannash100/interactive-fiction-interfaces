import {RECEIVE_GRAPH} from '../actions/graph'

const initialState = {
  ready: false
}

export default function (state = initialState, action) {

    switch(action.type) {
      case RECEIVE_GRAPH:
        return { graph: action.graph, ready: true }
      default:
        return state
    }
  }