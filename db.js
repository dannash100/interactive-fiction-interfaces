const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const conn = require('knex')(config)
const {createGraph} = require('./server/node-graph')

module.exports = {
  getMessages,
  getQuestion,
  getScene,
  getFilter,
  getItem,
  getScenes
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




