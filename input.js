const db = require('./db');
const display = require('./display');
const { checkCondition, checkEvent } = require('./events_conditions');
const { moveScene } = require('./gamestate')



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
        if (!checkMove(words, scene) && !checkGlobal(words)) {
            let [noun, verb] = checkVerbs(words)
            getFilter(noun, scene, verb)
        }
        return resolve()
    })
}



function checkMove(words, scene) {
    let found = ""
    words = words.toUpperCase().trim()
    for (let type in movement) {
        movement[type].forEach((command) => {
            if (words === command.toUpperCase()) found = type
        })
    }
    if (found) moveScene(found, scene)
    return found
}


function checkGlobal(words) {
    let found = false
    words = words.toUpperCase().trim()
    for (let type in global) {
        global[type].forEach((command) => {
            if (words === command.toUpperCase()) found = type
        })
    }    
    switch (found) {
        case "inventory":
            display.printInventory()
            break
    }
    return found
}



function checkVerbs(words) {
    let commandType = Object.keys(commands)
    words = words.toUpperCase()
    for (let i = 0; i < commandType.length; i++) {
        for (let y = 0; y < commands[commandType[i]].length; y++) {
            if (words.includes(commands[commandType[i]][y].toUpperCase())) {
                noun = words.replace(commands[commandType[i]][y].toUpperCase(), "").trim()
                return [noun, commandType[i]]
            }
        }
    }
    return [words, "other"]
}




function getFilter(words, scene, type) {
    return db.getFilter(scene.name, type).then(filter => {
        runFilter(words, filter, type)
    })
}


function runFilter(words, filter, type) {
    let reply = ""
    words = words.toLowerCase()
    for (let i = 0; i < filter.length; i++) {
        if (words === filter[i].input || words === filter[i].alias1 || words === filter[i].alias2 || words === filter[i].alias3) {
            if (checkCondition(filter[i].condition, filter[i].condition_detail) && checkCondition(filter[i].condition2, filter[i].condition_detail2)) reply = filter[i].reply
            checkEvent(filter[i].event, filter[i].event_detail)
            checkEvent(filter[i].event2, filter[i].event_detail2)
        }
    }
    if (!reply) reply = `${defaultResponse[type][0]} ${words} ${defaultResponse[type].length == 2 ? defaultResponse[type][1] : ""}`
    return display.printAnswer(reply)
}


module.exports = {
    processInput,
    checkMove
}