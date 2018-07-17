const writeJsonFile = require('write-json-file')
const loadJsonFile = require('load-json-file')
const db = require('./db')

let currentPlayer = {
  "name": "test",
  "current scene": 1,
  "refresh": false,
  "visited scenes": [0],
  "progress": {
    "is alive": true,
  },
  "inventory": {
   
  },
  "itemsUsed": []
}


function checkCondition(condition, detail) {
  switch (condition) {
      case "hasItem":
          return currentPlayer.inventory.hasOwnProperty(detail)
      case "hasNotItem":
          return !currentPlayer.inventory.hasOwnProperty(detail) && !currentPlayer.itemsUsed.includes(detail)
      case "hasUsed":
          return currentPlayer.inventory.hasOwnProperty(detail) || currentPlayer.itemsUsed.includes(detail) 
      case "hasVisited":
          return currentPlayer["visited scenes"].includes(Number(detail))
      case "hasNotVisited":
          return !currentPlayer["visited scenes"].includes(Number(detail))
      case "hasProgress":
          return currentPlayer.progress[detail]
      case "hasNotProgress":
          return !currentPlayer.progress[detail]
      default:
          return true
  }
}

function checkEvent(event, detail) {
  switch (event) {
      case "getItem":
          return getItem(detail)
      case "loseItem":
          return loseItem(detail)
      case "getProgress":
          return getProgress(detail)
      case "loseProgress":
          return loseProgress(detail)
      case "movePlayer":
          return changeScene(detail)
      default:
          return
  }
}

const moveScene = (words, scene) => currentPlayer["current scene"] = scene[words]
const refreshScene = () => currentPlayer.refresh = true


const getItem = name => {
  db.getItem(name).then(item => {
    currentPlayer.inventory[item.name] = item.description
  })
}

const loseItem = name => {
  currentPlayer.itemsUsed.push(name)
  delete currentPlayer.inventory[name]
}

const getProgress = progress => currentPlayer.progress[progress] = true
const loseProgress = progress => currentPlayer.progress[progress] = false


function newPlayer(name) {
    let newPlayer = {
      "name": name,
      "current scene": 1,
      "refresh": false,
      "visited scenes": [0],
      "progress": {
        "is alive": true,
      },
      "inventory": {

      },
      "itemsUsed": []
    }
    loadJsonFile('gamestate.json').then(data => {
      data.players.push(newPlayer)
      currentPlayer = newPlayer
      return writeJsonFile('gamestate.json', data)
    })
}

function loadPlayer(name) {
  loadJsonFile('gamestate.json').then(data => {
    currentPlayer = data.Player.find(x => x.name == name)
  })
}

function savePlayer(name) {
  loadJsonFile('gamestate.json').then(data => {
    let pulledData = data.players.find(x => x.name == name)
    Object.assign(pulledData, currentPlayer)
    writeJsonFile('gamestate.json', data).then(() => {})

  })
}


module.exports = {
  currentPlayer,
  savePlayer,
  loadPlayer,
  newPlayer,
  getItem,
  loseItem,
  getProgress,
  loseProgress,
  moveScene,
  refreshScene,
  checkCondition,
  checkEvent
}