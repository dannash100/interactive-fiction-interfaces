const writeJsonFile = require('write-json-file')
const loadJsonFile = require('load-json-file')


let currentPlayer = {}

asyncTestCall()

async function asyncTestCall() {
  await newPlayer('dan')
  console.log(currentPlayer)
}

function newPlayer (name) {
   return new Promise(resolve => {
    let newPlayer = {
      "name": name,
      "current scene": 0,
      "visited scenes": [0],
      "progress": {
        "is alive" : true,
      },
      "inventory": {
      }
    }
    loadJsonFile('gamestate.json').then(data => {
      data.players.push(newPlayer)
      currentPlayer = newPlayer
        writeJsonFile('gamestate.json', data).then(() => {
          resolve()
        }) 
      })  
    })
  }
  
async function loadPlayer (name) { 
  loadJsonFile('gamestate.json').then(data => {
   currentPlayer = data.Player.find(x => x.name == name)
  })
}

async function savePlayer(name) {
  loadJsonFile('gamestate.json').then(data => {
    let pulledData = data.players.find(x => x.name == name)
    Object.assign(pulledData, currentPlayer)
      writeJsonFile('gamestate.json', data).then(() => { 
  })
 
})
}


//// promise rejections

module.exports = {
  currentPlayer,
  savePlayer,
  loadPlayer,
  newPlayer
}