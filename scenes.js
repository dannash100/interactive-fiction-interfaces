const db = require('./db')
const {checkCondition} = require('./events_conditions')
const {currentPlayer} = require('./gamestate')
const {printScene, printMap} = require('./display')
const input = require('./input')
const inquirer = require('inquirer')
const chalk = require('chalk')
const clear = require('clear');


let currentScene = {}




const firstCondition = (scene) => {
  if (!checkCondition(scene.condition, scene.detail)) currentScene[scene.path] = 0
}

const secondCondition = ({condition2, detail2, path2}) => {
  if (!checkCondition(condition2, detail2)) currentScene[path2] = 0
}

const itemConditions = ({itemName, itemName2}) => {
  return db.getItem(itemName).then(item => {
    if (item && (checkCondition("hasNotItem", itemName))) currentScene.description += "\n" + item.scene_description
    return db.getItem(itemName2).then(item => {
      if (item && (checkCondition("hasNotItem", itemName2))) currentScene.description += "\n" + item.scene_description
    })
  })
}

const firstVisit = ({first_visit_description,id}) => {
  if (checkCondition("hasNotVisited", id)) {
    currentPlayer["visited scenes"].push(id)
    if (first_visit_description) currentScene.description = currentScene.first_visit_description + "\n" + currentScene.description
  }
}



function setUpScene(sceneId) {
  return db.getScene(sceneId).then(scene => {
    currentScene = scene
    firstCondition(scene)
    secondCondition(scene)
    firstVisit(scene)
    itemConditions(scene).then(() => {
     playScene()
    })
  })
}


function playScene(scene) {
  printScene(currentScene)
  printMap(currentScene)
  askForInput(currentScene)
}

function askForInput(scene) {
  var questions = [{
    name: 'input',
    type: 'input',
    message: '',
    suffix: "",
    prefix: chalk.red("?"),
    validate: function (value) {
      return (value.length) ? true : true
    }
    }]
    return inquirer.prompt(questions).then((answer) => {
        answer = answer.input
        input.processInput(answer, scene).then(() => {
            if (currentScene.id == currentPlayer["current scene"])   askForInput(scene)
            else clear(), setTimeout( () => setUpScene(currentPlayer["current scene"]), 50) 
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