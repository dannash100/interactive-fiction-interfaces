const db = require('./db');
const display = require('./display');
const { moveScene, refreshScene, checkCondition, checkEvent } = require('./gamestate')

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

const globals = {
    inventory: ["inventory", "pack", "look at inventory", "check inventory", "open inventory", "look in pack", "look in inventory", "look in bag"],
    look: ["look", "look around"],
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
        words = words.toUpperCase().trim()
        let found = checkGlobal(words)
        switch (found) {
            case "quit":
                return display.exit()
            case "inventory":
                display.printInventory()
                break
            case "look":
                display.printInventory()
        }
        if (!found) {
            found = checkMove(words)
            if (found) {
                if (scene[found]) moveScene(found, scene)
                else {
                    scene[`${found}_message`] ? display.printAnswer(scene[`${found}_message`])
                        : display.printAnswer(`the way to the ${found} is blocked`)
                }
            }
            else {
                let [noun, verb] = checkVerbs(words)
                getFilter(noun, scene, verb)
            }
        }
        resolve()
    })
}



function checkMove(words, scene) {
    let found = false
    for (let direction in movement) {
        movement[direction].forEach(command => {
            if (words === command.toUpperCase()) found = direction
        })
    }
    return found
}




function checkGlobal(words) {
    let found = false
    for (let command in globals) {
        globals[command].forEach(input => {
            if (words === input.toUpperCase()) found = command
        })
    }
    return found
}


function checkVerbs(words) {
    let found = false
    for (let command in commands) {
        commands[command].forEach(input => {
            if (words.includes(input.toUpperCase()) && !found) {
                noun = words.replace(input.toUpperCase(), "").trim()
                found = [noun, command]
            }
        })
    }
    return found ? found : [words, "other"]
}


function getFilter(words, scene, type) {
    return db.getFilter(scene.name, type).then(filter => {
        runFilter(words, filter, type)
    })
}

function runFilter(words, filter, type) {
    let reply = ""
    words = words.toLowerCase()
    filter.forEach((match) => {
        if (words === match.input || words === match.alias1 || words === match.alias2 || words === match.alias3) {
            if (checkCondition(match.condition, match.condition_detail) && checkCondition(match.condition2, match.condition_detail2)) {
                reply = match.reply
                checkEvent(match.event, match.event_detail)
                checkEvent(match.event2, match.event_detail2)
                if (match.refreshScene) refreshScene()
            }
        }
    })
    if (!reply) reply = `${defaultResponse[type][0]} ${words} ${defaultResponse[type].length == 2 ? defaultResponse[type][1] : ""}`
    return display.printAnswer(reply)
}

module.exports = {
    processInput,
    checkMove,
    checkGlobal,
    checkVerbs,
    getFilter,
    runFilter,
    movement
}