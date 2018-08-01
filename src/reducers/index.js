import {combineReducers} from 'redux'
import scene from './scene'
import scenes from './scenes'
import graph from './graph'

export default combineReducers({
  scene,
  scenes,
  graph
})