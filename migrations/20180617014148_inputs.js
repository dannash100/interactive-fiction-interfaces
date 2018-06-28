
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
  table.string('condition')
  table.string('condition2')
  table.string('condition_detail')
  table.string('condition_detail2')
  table.string('event')
  table.string('event2')
  table.string('event_detail')
  table.string('event_detail2')
})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('inputs')
};
