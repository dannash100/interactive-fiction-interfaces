
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('scenes').del()
    .then(function () {
      // Inserts seed entries
      return knex('scenes').insert([
        {id: 1, name: "test", description: "I am a test", north: 1, northeast: 1, northwest: 1, east: 4, west:1, south: 1, southeast: 2, southwest: 2},
        {id: 2, name: "test", description: "I am a test too", north: 0, northeast: 3, northwest: 0, east: 2, west: 0, south: 5, southeast: 0, southwest: 3},
        {id: 3, name: "test", description: "I am a third test", north: 0, northeast: 0, northwest: 0, east: 0, west: 0, south: 0, southeast: 0, southwest: 0}
      ]);
    });
};
