
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('game_state').del()
    .then(function () {
      // Inserts seed entries
      return knex('game_state').insert([
        {conditions: 'test'},
        {conditions: 'is alive'},
      ]);
    });
};
