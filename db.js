const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const conn = require('knex')(config)


module.exports = {
  getMessages,
  getQuestion,
  getScene,
  getFilter,
  getItem,
  getScenes,
  addScene
}

const oppositeDirections = {
  north: "south",
  east: "west",
  south: "north",
  west: "east",
  northeast: "southwest",
  southeast: "northwest",
  southwest: "northeast",
  northwest: "southeast"
}

function linkScene(sceneId, linkId, direction) {
  return conn('scenes')
  .where(id, sceneId)
  .insert(linkId, direction)
  .where(id, linkId)
  .insert(sceneId, oppositeDirections[direction])
}

function addScene(scene) {
  return conn('scenes')
  .insert(scene)
}

function getScenes() {
  return conn('scenes')
  .select()
}

function getMessages(ids) {
  return conn('messages')
    .whereIn('id', ids)
    .select()
}

function getQuestion(id) {
  return conn('messages')
    .where('id', id)
    .select()
}

function getItem(name) {
  return conn('inventory')
  .where('name', name)
  .select()
  .first()
}


function getScene(id) {
  return conn('scenes')
    .where('id', id)
    .select()
    .first()
}

function getFilter(scene, type) {
  return conn('inputs')
  .where('scene', scene)
  .where('type', type)
  .select()
}




