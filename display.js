const chalk = require('chalk');
const figlet = require('figlet');
const commandLineUsage = require('command-line-usage');
const data = require('./gamestate');
const boxen = require('boxen');
const inquirer = require('inquirer')
const db = require("./db")




var cell = "█"
player = chalk.white.bold("█")
header1 = "    N  "
header2 = "  N  "

const firstLayer = ({northwest,north,northeast}) => `${northwest ? cell : ' '} ${north ? cell : ' '} ${northeast ? cell : ' '}\n   `
const firstRoutes = ({northwest,north,northeast}) => `${northwest ? "╲" : " "}${north ? "│" : " "}${northeast ?  "╱" : " "}\n  `
const middleLayer = ({east,west}) => `${west ? cell + "―" + player : "  " + player}${east ? "―" + cell : "  "}\n   `
const bottomLayer = ({southwest,south,southeast}) => `${southwest ? "╱" : " "}${south ? "│" : " "}${southeast ? "╲" : " "}\n  `
const bottomRoutes = ({southwest,south,southeast}) => `${southwest ? cell : " "} ${south ? cell : " "} ${southeast ? cell : " "}\n`


function printScene(scene) {

  var map = "\n  "

  map += firstLayer(scene)
  map += firstRoutes(scene)
  map += middleLayer(scene)
  map += bottomLayer(scene)
  map += bottomRoutes(scene)

 let header = scene.map_header || header1


  let sections = [{
    header: `  ${chalk.rgb(220, 00, 00).underline(scene.name)}       ` ,
    
  },
  {
    content: {
      options: {},
      data: [{
          col: `{bold.keyword("white") ${scene.description} }`, 
          col2: chalk.rgb(220, 00, 00)(header + map), 
        },
      ]
    }
  },
]
  usage = commandLineUsage(sections)
  console.log(boxen(usage, {borderStyle: 'double-single'})) 

}

function printText() {
  var ids = Object.values(arguments)
  return db.getMessages(ids).then(text => {
    var messages = []
    text.forEach(x => {
      messages.push({
        name: x.name,
        type: 'input',
        message: x.message,
        prefix: "",
        suffix: chalk.dim("\n ..."),
        validate: function(value) {
          return (value.length) ? true : true
        }
      })

    })
    return inquirer.prompt(messages)
  })
}



function printMenu() {
  var questions = [{
    message: "what do you want to do...",
    name: "choice",
    type: 'list',
    prefix: chalk.red("?"),
    choices: [chalk.red("start a new game"), chalk.red("restore game"), chalk.red("exit game")]
  }]
  return inquirer.prompt(questions).then(answer => { 
    
  

  })
}

function printInventory() {
  let sections = [{
      header: `  ${chalk.underline("Inventory")}`,
    },
    {
      content: {
        options: {},
        data: [{
            col: '{bold.keyword("gold") rusty key:}',
            col2: `${chalk.white.bold("a key to the gardens")}`
          },
          {
            col: '{bold.keyword("gold") dogs head:}',
            col2: `${chalk.white.bold("picked up from dogtown, it makes your stomach turn")}`
          }
        ]
      }
    },
  ]
  let items = Object.keys(data.currentPlayer.inventory)
  descriptions = Object.values(data.currentPlayer.inventory)
  if (!items.length) {
    sections[1].content.data.push({
      col: `{bold.keyword("brown") Your pack contains no items. }`,
      col2: ""
    })
  } else {
    for (let i = 0; i < items.length; i++) {
      sections[1].content.data.push({
        col: `{bold.keyword("gold") ${items[i]}: }`,
        col2: `${chalk.white.bold(descriptions[i])}`
      })
    }
  }
  usage = commandLineUsage(sections)
  console.log(usage)
}


function titleFont(text) {
  console.log(chalk.red(
    figlet.textSync(text, {
      font: 'Epic',
      horizontalLayout: 'full'
    })))
}


function printAnswer (answer) {
  console.log(chalk.white.bold(answer))
}





module.exports = {
  printAnswer,
  printScene,
  titleFont,
  printInventory,
  printMenu,
  printText
}