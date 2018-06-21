const chalk = require('chalk');
const figlet = require('figlet');
const db = require('./db')
const commandLineUsage = require('command-line-usage')


var cell = "█"
player = "◘"
header1 = "    map  "
header2 = "     N"


db.getScene(1).then(x => {
  printMap(x[0], "     N")
})

const firstLayer = ({northwest, north, northeast}) => `${northwest ? cell : ' '}  ${north ? cell : ' '}  ${northeast ? cell : ' '}\n   `
const firstRoutes =({northwest, north, northeast}) => `${northwest ? "╲" : " "} ${north ? "┃" : " "} ${northeast ?  "╱" : " "}\n  `
const middleLayer = ({east, west}) => `${west ? cell + "━━" + player : "   " + player}${east ? "━━" + cell : "   "}\n   `
const bottomLayer = ({southwest, south, southeast}) => `${southwest ? "╱" : " "} ${south ? "┃" : " "} ${southeast ? "╲" : " "}\n  `
const bottomRoutes = ({southwest, south, southeast}) => `${southwest ? cell : " "}  ${south ? cell : " "}  ${southeast ? cell : " "}\n`

function printMap(scene, title) {
  var map = "\n  "

  map+=firstLayer(scene)
  map+=firstRoutes(scene)
  map+=middleLayer(scene)
  map+=bottomLayer(scene)
  map+=bottomRoutes(scene)

  header = title || header1

  console.log(chalk.red(header + map))

}




function displayInventory() {
sections = [
  {
    header: 'Inventory',
  },
  {
    content: {
      options: {
      },
      data: [
        { col: '{bold.keyword("gold") rusty key:}', col2: 'a key to the gardens' },
        { col: '{bold.keyword("gold") dogs head:}', col2: 'picked up from dogtown, it makes your stomach turn' }
      ]
    }
  },
]
usage = commandLineUsage(sections)
console.log(usage)
}

displayInventory()


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

titleFont("Dogtown")


function titleFont (text) { console.log(chalk.red(
  figlet.textSync(text, {
    font: 'Epic',
    horizontalLayout: 'full'
  })))
}



module.exports = {
  printMap:printMap
}


// printing map allows for customizable player and cell images to be swapped out as well as titles of scenes on printMap
//
