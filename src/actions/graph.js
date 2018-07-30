import {getGraph} from "../api/game"

export const REQUEST_GRAPH = "REQUEST_Graph"
export const RECEIVE_GRAPH = "RECEIVE_Graph"
export const ERROR = "ERROR"

const requestGraph = () => {
  return {
    type: REQUEST_GRAPH
  }
}

const receiveGraph = (graph) => {
  return {
    type: RECEIVE_GRAPH,
    graph
  }
}

const error = error => {
  return {
    type: ERROR,
    error
  }
}



export const fetchGraph = () => dispatch => {
    dispatch(requestGraph())
    return getGraph()
      .then(res => {
        let graph = res.body
        dispatch(receiveGraph(graph))
      })
      .catch(err => {
        dispatch(error(err.message))
      })
  }
  