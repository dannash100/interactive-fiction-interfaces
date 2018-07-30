import {RECEIVE_GRAPH} from '../actions/graph'

export default function (state = {ready: false}, action) {

    switch(action.type) {
      case RECEIVE_GRAPH:
        return { graph: action.graph, ready: true }
      default:
        return state
    }
  }