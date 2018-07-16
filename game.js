const clear       = require('clear');
const {setUpScene} = require('./scenes')
const {titleFont, printMenu, printText} = require('./display')
const chalk = require('chalk');                                                          
var player = require('play-sound')(opts = {})


startGame()
                         
function startGame() {
  player.play('Kigns quest.mp3', (err) =>{
    if (err) throw err
  })
  titleFont('DogTown')
  console.log(chalk.white.bold("                                            A game by Dan Nash \n\n"))
  printMenu()
  .then(()=> {
    clear()
    printText()
  })
  .then(() => {
    setUpScene(1)
  })
  
}


function gameWin() {

}

function gameDie() {

}


