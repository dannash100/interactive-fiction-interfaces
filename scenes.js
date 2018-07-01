
const db = require('./db')
const { checkCondition } = require('./events_conditions')
const { currentPlayer } = require('./gamestate')
const { printScene, printMap} = require('./display')
const input = require('./input')
const inquirer = require('inquirer')
const chalk = require('chalk')


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
  return db.getItem(itemName2).then(item => {
    if (item && (checkCondition("hasNotItem", itemName2))) currentScene.description += "\n" + item.scene_description
    })
  })
}

const firstVisit = ({ first_visit_description, id }) => {
  if (checkCondition("hasNotVisited", id)) {
    currentPlayer["visited scenes"].push(id)
    if (first_visit_description) currentScene.description = currentScene.first_visit_description + "\n" + currentScene.description
  }
}


function refreshScene() {
  console.log(currentPlayer["current scene"])
  return db.getScene(1).then(scene=> {
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
  console.log(currentScene)
  printScene(currentScene)
  printMap(currentScene)
  askForInput(scene)
}

function askForInput (scene) {
  var questions = [{
      name: 'input',
      type: 'input',
      message: '',
      suffix: "",
      prefix: chalk.red("?"),
      validate: function(value) {
        return (value.length) ? true : true
      }
    }]
    return inquirer.prompt(questions).then((answer) => {
      answer = answer.input
       input.processInput(answer, scene).then(()=> {
          refreshScene().then(() => {
            askForInput(scene)
          })
       })
    })
    .catch((err) => {
      console.log(err)
    })
}


module.exports = {
  refreshScene,
  setUpScene,
  currentScene
 
}