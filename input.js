const db = require('./db');
const display = require('./display');
const {
    checkCondition
} = require('./events_conditions');
const {
    moveScene
} = require('./gamestate')



const commands = {
    lookIn: ["look inside the", "look into the", "look inside", "look into", "look in"],
    lookAt: ["look at the", "look at", "look to", "look"],
    push: ["push the", "move the", "push", "move"],
    pull: ["pull the", "pull"],
    take: ["pick up the", "take the", "pickup the", "pick up", "get the", "pickup", "take", "get", "grab"],
    open: ["open the", "open"],
    close: ["close the", "close"],
    turn: ["turn the", "rotate the", "spin the", "turn", "rotate", "spin"],
    drink: ["drink the", "drink"],
    eat: ["eat the", "consume the", "eat", "consume"],
    read: ["read the", "read"]
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
    inventory: ["inventory", "pack", "look at inventory", "check inventory", "open inventory", "look in pack", "look in inventory", "look in bag"],
    quit: ["quit", "exit game", "quit game"],
    save: ["save", "save progress", "save game"],
    load: ["load", "load game", "restore"]
}

const defaultResponse = {
    lookIn: ["I can't see the"],
    lookAt: ["I can't see the"],
    push: ["I can't push the"],
    pull: ["I can't pull the"],
    take: ["I can't take the"],
    open: ["I can't open the"],
    close: ["I can't close the"],
    turn: ["I can't turn the"],
    drink: ["The", "will not be very refreshing"],
    eat: ["I don't think the", "would agree with you"],
    read: ["The", "is not readable"],
    other: ["I didn't understand your request to"]
}



function processInput(words, scene) {
    return new Promise(resolve => {

        if (checkMove(words, scene)) {
            resolve()
        }else{
            if (!checkGlobal(words)) {
                const result = checkVerbs(words)
                if (result) {
                    getFilter(result[1], scene, result[0]).then(()=> {
                       resolve()
                    })
                } else {
                    getFilter(words, scene).then(() => {
                        resolve()
                       
                    })
                }
            }
        }
    })
}



function checkMove(words, scene) {
    let found = ""
    let commandType = Object.keys(movement)
    words = words.toUpperCase().trim()
    for (let i = 0; i < commandType.length; i++) {
        for (let y = 0; y < movement[commandType[i]].length; y++) {
            if (words === movement[commandType[i]][y].toUpperCase()) found = commandType[i]
        }
    }
    if (found) moveScene(found, scene)
    return found
}


function checkGlobal(words) {
    let found = false
    let commandType = Object.keys(global)
    words = words.toUpperCase().trim()
    for (let i = 0; i < commandType.length; i++) {
        for (let y = 0; y < global[commandType[i]].length; y++) {
            if (words === global[commandType[i]][y].toUpperCase()) found = commandType[i]
        }
    }
    if (found) display.printAnswer(found)
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




function getFilter(words, scene, type) {
    type = type || "other"
    return db.getFilter(scene.name, type).then(filter => {
        runFilter(words, filter, type)
    })
}


function runFilter(words, filter, type) {
    let reply = ""
    words = words.toLowerCase()
    for (let i = 0; i < filter.length; i++) {
        if (words == filter[i].input || filter[i].alias1 || filter[i].alias2 || filter[i].alias3) {
            if (checkCondition(filter[i].condition, filter[i].condition_detail) && checkCondition(filter[i].condition2, filter[i].condition_detail2)) reply = filter[i].reply
        }
    }
    if (!reply) reply = `${defaultResponse[type][0]} ${words} ${defaultResponse[type].length == 2 ? defaultResponse[type][1] : ""}`
    display.printAnswer(reply)
}


module.exports = {
    processInput,
    checkMove
}