
const db = require('./db')
const { checkCondition } = require('./events_conditions')
const { currentPlayer } = require('./gamestate')
const { printScene, printMap, printAnswer } = require('./display')
const {askForInput} = require('inquirer')


let currentScene = {}



const firstCondition = ({ condition, detail, path }) => {
  if (!checkCondition(condition, detail)) currentScene[path] = 0
}

const secondCondition = ({ condition2, detail2, path2 }) => {
  if (!checkCondition(condition2, detail2)) currentScene[path2] = 0
}

const itemConditions = ({ itemName, itemName2 }) => {
  return db.getItem(itemName).then(item => {
    if (item && (checkCondition("hasNotItem", itemName))) currentScene.description += "\n" + item.scene_description
  })
  return db.getItem(itemName2).then(item => {
    if (item && (checkCondition("hasNotItem", itemName2))) currentScene.description += "\n" + item.scene_description
  })
}

const firstVisit = ({ first_visit_description, id }) => {
  if (checkCondition("hasNotVisited", id)) {
    currentPlayer["visited scenes"].push(id)
    if (first_visit_description) currentScene.description = currentScene.first_visit_description + "\n" + currentScene.description
  }
}


function refreshScene() {
  return db.getScene(currentPlayer["current scene"]).then(scene=> {
    firstCondition(scene)
    secondCondition(scene)
    firstVisit(scene)
    itemConditions(scene).then(() => {
  })
})
}

function setUpScene(sceneId) {
  return db.getScene(sceneId).then(scene => {
    currentScene = scene
    firstCondition(scene)
    secondCondition(scene)
    firstVisit(scene)
    itemConditions(scene).then(() => {
      playScene(scene)
    })
  })
}


function playScene(scene) {
  printScene(scene)
  printMap(scene)
  askForInput()
}




module.exports = {
  refreshScene,
  setUpScene
 
}