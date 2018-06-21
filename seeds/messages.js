exports.seed = function (knex, Promise) {
  return knex('messages').del()
    .then(function () {
      return knex('messages').insert([
        {id: 1, message: "Test one", name: "test1", nInput: "no"},
        {id: 2, message: "Test two", name: "test2", nInput: "no"},
        {id: 3, message: "Test three", name: "test3", nInput: "no"},
      ])
    })
}
