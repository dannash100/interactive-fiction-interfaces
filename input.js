const data = require('./gamestate')

/*Commands  
- check global commands 
- get text find what kind of action it is
- remove from string 
- analyze remaining words
- each item can have an alias in database- SO it can be bird - or red bird and get same action
- ultimatly it will filter through a database using where of scene and action type. 
- if active 


*/


const commands = {
    lookAt: ["look", "look at", "look to"],
    lookIn: ["look in", "look into", "look inside"],
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
    inventory: ["inventory", "pack", "look at inventory", "check inventory", "open inventory"],



}


processInput("south")
processInput("dog")


function processInput(word) {

    if (checkMove(word)) console.log
    
}


function checkMove(words) {

    let found = false

    for (let i = 0; i < commands.north.length; i++) {
        if (words.toUpperCase() == commands.north[i].toUpperCase()) console.log("go north"), found = true
        if (words.toUpperCase() == commands.east[i].toUpperCase()) console.log("go east"), found = true
        if (words.toUpperCase() == commands.south[i].toUpperCase()) console.log("go south"), found = true 
        if (words.toUpperCase() == commands.west[i].toUpperCase()) console.log("go west"), found = true
    }
    for (let i = 0; i < commands.northwest.length; i++) {
        if (words.toUpperCase() == commands.northwest[i].toUpperCase()) console.log("go northwest"), found = true
        if (words.toUpperCase() == commands.northeast[i].toUpperCase()) console.log("go northeast"), found = true
        if (words.toUpperCase() == commands.southwest[i].toUpperCase()) console.log("go southwest"), found = true
        if (words.toUpperCase() == commands.southeast[i].toUpperCase()) console.log("go southeast"), found = true
        }

    return found
}


function checkGlobal(words) {

}

//movement, pickup object anything that needs a scene change or refresh- including look


function checkAction() {

}

//local inconsiquential activities with small responses


function checkLocal(words, scene) {

}