const chalk       = require('chalk');
const clear       = require('clear');
const figlet      = require('figlet');
const {setUpScene} = require('./scenes')

// const inquirer  = require('./inquirer');

// const run = async () => {
//   const received = await inquirer.askUserForName();
//   console.log(credentials);
// }

startGame()

function startGame() {
  clear()
  setUpScene(1)

  console.log(
    chalk.red(
      figlet.textSync('Dan Nash', {
        horizontalLayout: 'full'
      })
    )
  )
}


function gameWin() {

}

function gameDie() {

}


