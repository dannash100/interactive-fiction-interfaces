const data = require('./gamestate')
const db = require('./db')


const commands = {
    lookAt: ["look at the", "look at", "look to", "look"],
    lookIn: ["look inside the", "look inside", "look into", "look in"],
    push: ["push", "move"],
    pull: ["pull"],
    take: ["pick up", "get the", "pickup", "take", "get"],
    open: ["open"],
    close: ["close"],
    turn: ["turn", "rotate", "spin"],
    drink: ["drink"],
    eat: ["eat", "consume"],
    read: ["read"]
}

const movement = {
    north: ["n", "north", "go north", "move north", "walk north"],
    east: ["e", "east", "go east", "move east", "walk east"],
    south: ["s", "south", "go south", "move south", "walk south"],
    west: ["w", "west", "go west", "move west", "walk west"],
    northwest: ["nw", "northwest", "go northwest", "move northwest", "walk northwest", "north-west", "go north-west", "move north-west", "walk north-west"],
    northeast: ["ne", "northeast", "go northeast", "move northeast", "walk northeast", "north-east", "go north-east", "move north-east", "walk north-east"],
    southwest: ["sw", "southwest", "go southwest", "move southwest", "walk southwest", "south-west", "go south-west", "move south-west", "walk south-west"],
    southeast: ["se", "southeast", "go southeast", "move southeast", "walk southeast", "south-east", "go south-east", "move south-east", "walk south-east"]
}

const global = {
    inventory: ["inventory", "pack", "look at inventory", "check inventory", "open inventory", "look in pack", "look in inventory"],
    quit: ["quit", "exit game", "quit game"],
    save: ["save", "save progress", "save game"],
    load: ["load", "load game", "restore"]
}



//     if (!checkMove(word)) 


function processInput(words, scene) {

}





function checkMove(words) {
    let found = false
    words = words.toUpperCase()
    for (let i = 0; i < movement.north.length; i++) {
        if (words === movement.north[i].toUpperCase()) console.log("go north"), found = true
        if (words === movement.east[i].toUpperCase()) console.log("go east"), found = true
        if (words === movement.south[i].toUpperCase()) console.log("go south"), found = true
        if (words === movement.west[i].toUpperCase()) console.log("go west"), found = true
    }
    for (let i = 0; i < movement.northwest.length; i++) {
        if (words === movement.northwest[i].toUpperCase()) console.log("go northwest"), found = true
        if (words === movement.northeast[i].toUpperCase()) console.log("go northeast"), found = true
        if (words === movement.southwest[i].toUpperCase()) console.log("go southwest"), found = true
        if (words === movement.southeast[i].toUpperCase()) console.log("go southeast"), found = true
    }
    return found
}


function checkGlobal(words) {
    let found = false
    words = words.toUpperCase()
    global.inventory.forEach(command => {
        if (words === command.toUpperCase()) console.log("inventory"), found = true
    })
    global.quit.forEach(command => {
        if (words === command.toUpperCase()) console.log("quit"), found = true
    })
    global.save.forEach(command => {
        if (words === command.toUpperCase()) console.log("save"), found = true
    })
    global.load.forEach(command => {
        if (words === command.toUpperCase()) console.log("load"), found = true
    })
    return found
}


function checkVerbs(words) {
    let commandType = Object.keys(commands)
    words = words.toUpperCase()

    for (let i = 0; i < commandType.length; i++) {
        for (let y = 0; y < commands[commandType[i]].length; y++) {
            if (words.includes(commands[commandType[i]][y].toUpperCase())) {
                noun = words.replace(commands[commandType[i]][y].toUpperCase(), "").trim()
                return [commandType[i], noun]
            }
        }
    }
    return false
}

function getSceneFilter(words, scene) {
    db.getFilterOther(scene).then(filter => {
        console.log(filterOther(words, filter))
    })
}


function filterOther(words, filter) {
    let reply = ""
    for (let i = 0; i < filter.length; i++) {
        if (words == filter[i].input) reply = filter[i].reply
        return filter[i].reply
    }
}


getSceneFilter("dog", "dogtown")


function filterNoun(noun, type, scene) {


}



// checkMove("south")
// checkGlobal("inventory")