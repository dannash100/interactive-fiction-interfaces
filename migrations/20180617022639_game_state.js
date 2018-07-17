
exports.up = function(knex, Promise) {
  return knex.schema.createTable('game_state', (table) =>{
  table.string('conditions')
})
};

exports.down = function(knex, Promise) {
 return knex.schema.dropTable('game_state')
};
