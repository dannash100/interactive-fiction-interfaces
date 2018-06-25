const data = require('./gamestate')

/*to do 

- analyze remaining words
- each item can have an alias in database- SO it can be bird - or red bird and get same action
- ultimatly it will filter through a database using where of scene and action type. 
- if active 


*/


const commands = {
    lookAt: ["look at", "look to", "look"],
    lookIn: ["look inside", "look into", "look in"],
    push: ["push", "move"],
    pull: ["pull"],
    take: ["pick up", "pickup", "take", "get"],
    open: ["open"],
    close: ["close"],
    turn: ["turn", "rotate", "spin"],
    drink: ["drink"],
    eat: ["eat", "consume"],
    read: ["read"],
    north: ["n", "north", "go north", "move north", "walk north"],
    east: ["e", "east", "go east", "move east", "walk east"],
    south: ["s", "south", "go south", "move south", "walk south"],
    west: ["w", "west", "go west", "move west", "walk west"],
    northwest: ["nw", "northwest", "go northwest", "move northwest", "walk northwest", "north-west", "go north-west", "move north-west", "walk north-west"],
    northeast: ["ne", "northeast", "go northeast", "move northeast", "walk northeast", "north-east", "go north-east", "move north-east", "walk north-east"],
    southwest: ["sw", "southwest", "go southwest", "move southwest", "walk southwest", "south-west", "go south-west", "move south-west", "walk south-west"],
    southeast: ["se", "southeast", "go southeast", "move southeast", "walk southeast", "south-east", "go south-east", "move south-east", "walk south-east"],
    inventory: ["inventory", "pack", "look at inventory", "check inventory", "open inventory", "look in pack", "look in inventory"],
    quit: ["quit", "exit game", "quit game"],
    save: ["save", "save progress", "save game"],
    load: ["load", "load game", "restore"]

}





// function processInput(word) {

//     if (!checkMove(word)) console.log

// }

function processInput(words, scene) {

}




function checkMove(words) {
    let found = false
    words = words.toUpperCase()
    for (let i = 0; i < commands.north.length; i++) {
        if (words === commands.north[i].toUpperCase()) console.log("go north"), found = true
        if (words === commands.east[i].toUpperCase()) console.log("go east"), found = true
        if (words === commands.south[i].toUpperCase()) console.log("go south"), found = true
        if (words === commands.west[i].toUpperCase()) console.log("go west"), found = true
    }
    for (let i = 0; i < commands.northwest.length; i++) {
        if (words === commands.northwest[i].toUpperCase()) console.log("go northwest"), found = true
        if (words === commands.northeast[i].toUpperCase()) console.log("go northeast"), found = true
        if (words === commands.southwest[i].toUpperCase()) console.log("go southwest"), found = true
        if (words === commands.southeast[i].toUpperCase()) console.log("go southeast"), found = true
    }
    return found
}


function checkGlobal(words) {
    let found = false
    words = words.toUpperCase()
    commands.inventory.forEach(command => {
        if (words === command.toUpperCase()) console.log("inventory"), found = true
    })
    commands.quit.forEach(command => {
        if (words === command.toUpperCase()) console.log("quit"), found = true
    })
    commands.save.forEach(command => {
        if (words === command.toUpperCase()) console.log("save"), found = true
    })
    commands.load.forEach(command => {
        if (words === command.toUpperCase()) console.log("load"), found = true
    })
    return found
}





function checkVerbs(words) {
    words = words.toUpperCase()
    for (let i = 0; i < commands.lookIn.length; i++) {
        if (words.includes(commands.lookIn[i].toUpperCase())) {
            noun = words.toUpperCase().replace(commands.lookIn[i].toUpperCase(), "").trim()
            return ["lookIn", noun]
        }
    }
    for (let i = 0; i < commands.lookAt.length; i++) {
        if (words.includes(commands.lookAt[i].toUpperCase())) {
            noun = words.toUpperCase().replace(commands.lookAt[i].toUpperCase(), "").trim()
            return ["lookAt", noun]
        }
    }
    
    return false
}

console.log(checkVerbs("LoOk dogman"))
console.log(checkVerbs("look Inside red cup"))

function filterOther(words, scene) {

}

function filterNoun(noun, type, scene) {


}