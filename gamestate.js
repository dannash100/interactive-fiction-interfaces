const fs = require('fs')
const writeJsonFile = require('write-json-file')
const loadJsonFile = require('load-json-file')

let currentPlayer = {
  "id" : 0,
  "name": "test100",
  "current scene": 0,
  "visited scenes": [],
  "progress": {
    "is alive" : true,
    "is thirsty": false
  },
  "inventory": {
    "key" : "its a keyz",
    "dog head": "picked this up at the accident"
    
  }

}
 function newPlayer () {

}

async function loadPlayer (id) { 
  loadJsonFile('gamestate.json').then(data => {
   currentPlayer = data.Player.find(x => x.id == id)
  })
}

async function savePlayer(id) {
  loadJsonFile('gamestate.json').then(data => {
    let playerData = data.players.find(x => x.id == id)
    let updatedData = Object.assign(playerData, currentPlayer)
      writeJsonFile('gamestate.json', data).then(() => {
        console.log('done') 
  })
 
})
}



savePlayer(0)
