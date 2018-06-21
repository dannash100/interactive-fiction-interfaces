
exports.up = function(knex, Promise) {
  return knex.schema.createTable('scenes', (table) =>{
  table.increments('id')
  table.string('name')
  table.string('description')
  table.integer('north')
  table.integer('northeast')
  table.integer('northwest')
  table.integer('east')
  table.integer('west')
  table.integer('south')
  table.integer('southeast')
  table.integer('southwest')
})
};

exports.down = function(knex, Promise) {
 return knex.schema.dropTable('scenes')
};
