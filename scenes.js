const db = require('./db')
const { currentPlayer, checkCondition } = require('./gamestate')
const { printScene } = require('./display')
const input = require('./input')
const inquirer = require('inquirer')
const chalk = require('chalk')
const clear = require('clear');

let currentScene = {}


const firstCondition = (scene) => {
  if (!checkCondition(scene.condition, scene.detail)) currentScene[scene.path] = 0
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

function refreshScene(sceneId) {
  return db.getScene(sceneId).then(scene => {
    currentScene = scene
    firstCondition(scene)
    secondCondition(scene)
    itemConditions(scene)
  })
}

function setUpScene(sceneId) {
  return db.getScene(sceneId).then(scene => {
    currentScene = scene
    firstCondition(scene)
    secondCondition(scene)
    firstVisit(scene)
    itemConditions(scene).then(() => {
      printScene(currentScene)
      askForInput(currentScene)
    })
  })
}

function askForInput(scene) {
  var questions = [{
    name: 'input',
    type: 'input',
    message: '',
    suffix: "",
    prefix: chalk.red("?"),
    validate: function (value) {
      return (value.length) ? true : false
    }
    }]
    return inquirer.prompt(questions).then((answer) => {
      answer = answer.input
      input.processInput(answer, scene).then(() => {
          if (currentPlayer.refresh == true) {
            clear()
            currentPlayer.refresh = false
            setTimeout(() => setUpScene(currentPlayer["current scene"]), 50)
          } else if (currentScene.id == currentPlayer["current scene"]) {
            refreshScene(currentPlayer["current scene"]).then(() => askForInput(scene))
          } else {
            clear()
            setTimeout(() => setUpScene(currentPlayer["current scene"]), 50)
          }
        })
        .catch((err) => {
          console.log(err);
        })
    })
    }

    module.exports = {

  setUpScene,
  currentScene

}