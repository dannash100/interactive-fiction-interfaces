
exports.up = function(knex, Promise) {
return knex.schema.createTable('inventory', (table) =>{
  table.increments('id')
  table.string('name')
  table.string('description')
  table.string('scene_description')
  table.string('inspect_description')
})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('inventory')
};
