const inquirer = require('inquirer');
const db = require('./db')
const chalk = require('chalk');
const input = require("./input")
const colors = require('colors')



// test("dogtown")
// printText(2, 3, 1)
printMenu().then(() => {
  setTimeout( () => test("dogtown"), 200)
})

function printMenu() {
  var questions = [{
    name: "what do you want to do...",
    suffix: "",
    prefix: chalk.red('?'),
    type: 'list',
    choices: [chalk.red("start a new game"), chalk.red("restore game"), chalk.red("exit game")]
  }]
  return inquirer.prompt(questions).then(answer => { 
    answer = answer["what do you want to do..."]
    if (answer == "\u001b[31mstart a new game\u001b[39m") console.log("new game")
    if (answer == "\u001b[31mrestore game\u001b[39m") console.log("restore game")
    if (answer == "\u001b[31mexit game\u001b[39m") console.log("exit game")

  })
}


function test (scene) {
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

    return inquirer.prompt(questions).then(answer =>  input.processInput(Object.values(answer)[0], scene)
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





