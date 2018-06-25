
exports.up = function(knex, Promise) {
return knex.schema.createTable('inputs', (table) =>{
  table.increments('id')
  table.string('scene')
  table.string('input')
  table.string('alias1')
  table.string('alias2')
  table.string('alias3')
  table.string('reply')
  table.string('type')
})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('inputs')
};
