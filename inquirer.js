const inquirer = require('inquirer');
const db = require('./db')
const chalk = require('chalk');
const input = require("./input")



test("dogtown")
// printText(2, 3, 1)

function mainMenu() {
  
}


function test (scene) {
  var questions = [{
      name: 'input',
      type: 'input',
      message: '',
      suffix: "",
      validate: function(value) {
        return (value.length) ? true : true
      }
    }]

    return inquirer.prompt(questions).then(answer => input.processInput(Object.values(answer)[0], scene)
  )
}




function printText() {
  var ids = Object.values(arguments)
  db.getMessages(ids).then(text => {
    var messages = []
    text.forEach(x => {
      messages.push({
        name: x.name,
        type: 'input',
        message: x.message,
        prefix: "",
        suffix: chalk.red("..."),
        validate: function(value) {
          return (value.length) ? true : true
        }
      })

    })
    return inquirer.prompt(messages)
  })
}





