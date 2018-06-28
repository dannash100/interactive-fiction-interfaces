const chalk       = require('chalk');
const clear       = require('clear');
const figlet      = require('figlet');
const inquirer  = require('./inquirer');

// const run = async () => {
//   const received = await inquirer.askUserForName();
//   console.log(credentials);
// }

startGame()



function startGame() {
  clear()
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
