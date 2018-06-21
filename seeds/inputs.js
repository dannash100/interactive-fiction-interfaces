
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('inputs').del()
    .then(function () {
      // Inserts seed entries
      return knex('inputs').insert([
        {id: 1, scene: "dogtown", input: "dog", reply: "woof"},
        {id: 2, scene: "dogtown", input: "cat",  reply: "miow"},
        {id: 3, scene: "dogtown", input: "cow",  reply: "moo"},
        {id: 4, scene: "dogtown", input: "get cow",  reply: "You can't get cow"},
      ]);
    });
};
