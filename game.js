const clear       = require('clear');
const {setUpScene} = require('./game/scenes')
const {titleFont, printMenu, printText} = require('./game/display')
const chalk = require('chalk');   

/*
to play sound:
var player = require('play-sound')(opts = {})
player.play('Kigns quest.mp3', (err) =>{
  if (err) throw err
})
*/

startGame()
                         
function startGame() {
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

