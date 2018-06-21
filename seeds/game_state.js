
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('game_state').del()
    .then(function () {
      // Inserts seed entries
      return knex('game_state').insert([
        {id: 1, condition: 'test', complete: 'true'},
        {id: 2, condition: 'is alive', complete: 'true'},
      ]);
    });
};
