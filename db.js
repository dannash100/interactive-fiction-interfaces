const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const conn = require('knex')(config)

module.exports = {
  getMessages: getMessages,
  getQuestion: getQuestion,
  getFilterByScene: getFilterByScene,
  getScene: getScene

}

//fetches messages can take any number of arguments

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

function getFilterOther(scene) {
  return conn('inputs')
    .where('scene', scene)
    .select()
}

function getScene(id) {
  return conn('scenes')
    .where('id', id)
    .select()
}

function getFilter(scene, type) {
  return conn('inputs')
  .where('scene', scene)
  .andWhere('type', type)
  .select()
}




