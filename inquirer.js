const inquirer = require('inquirer');
const db = require('./db')
const chalk = require('chalk');
// const scene = require('./scene')



function mainMenu() {
  
}

// question prompt from single id
// nInput prints on rejected input

function displayQuestion(id, scene) {
  db.getQuestion(id).then(question => {
    var questions = [{
      name: question[0].name,
      type: 'input',
      message: question[0].message,
      validate: function(value) {
        return (value.length) ? true : question[0].nInput
      }
    }]
    return inquirer.prompt(questions).then(answer => processAnswers(answer, scene))
  })
}

// displays a group of messages by id's -- displays with ... in-between


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




function processAnswers(answer, scene) {
  var arr = Object.values(answer)
  filterWords(arr, scene)

}


// Filters input and returns response based on where character is in the game

function filterWords(words, scene) {
  let word = words[0]
  console.log(word, scene)
  db.getFilterOther(scene).then(filter => {
    filter.forEach((x, i) => {
      if (word == x.input) console.log(x.reply)
    })
  })
}



// printLinesText(2, 3, 1)

displayQuestion(1, "dogtown")
