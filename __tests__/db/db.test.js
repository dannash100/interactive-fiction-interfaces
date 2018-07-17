const request = require('supertest')
const env = require('./test-environment')

let testDb = null

beforeEach(() => {
  testDb = env.getTestDb()
  return env.initialise(testDb)
})
afterEach(() => env.cleanup(testDb))

// test('post meeting db func returns an array with an id', () => {
//   const meeting = {
//     meeting_name: 'potatoes',
//     duration: 4000,
//     attendees: 9001,
//     cost: 9002
//   }
//   postMeeting(meeting, testDb)
//     .then(array => {
//       expect(array.length).toBe(1)
//     })
// })

