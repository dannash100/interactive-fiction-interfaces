const chalk       = require('chalk');
const clear       = require('clear');
const figlet      = require('figlet');
const {setUpScene} = require('./scenes')
const {titleFont} = require('./display')

// const inquirer  = require('./inquirer');

// const run = async () => {
//   const received = await inquirer.askUserForName();
//   console.log(credentials);
// }

startGame()

function startGame() {
  clear()
  titleFont('dogtown')
  setUpScene(1)
  
}


function gameWin() {

}

function gameDie() {

}


