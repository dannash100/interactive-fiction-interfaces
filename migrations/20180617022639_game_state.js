
exports.up = function(knex, Promise) {
  return knex.schema.createTable('game_state', (table) =>{
  table.increments('id')
  table.string('condition')
  table.boolean('complete')
})
};

exports.down = function(knex, Promise) {
 return knex.schema.dropTable('game_state')
};
