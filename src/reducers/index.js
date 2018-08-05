import {combineReducers} from 'redux'
import scene from './scene'
import scenes from './scenes'
import graph from './graph'
import create from './create'

export default combineReducers({
  scene,
  scenes,
  graph,
  create
})