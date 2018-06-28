const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const conn = require('knex')(config)

module.exports = {
  getMessages: getMessages,
  getQuestion: getQuestion,
  getScene: getScene,
  getFilter: getFilter

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


function getScene(id) {
  return conn('scenes')
    .where('id', id)
    .select()
}

function getFilter(scene, type) {
  return conn('inputs')
  .where('scene', scene)
  .where('type', type)
  .select()
}




