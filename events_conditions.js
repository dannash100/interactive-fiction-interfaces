const gameState = require('./gamestate')

console.log(checkCondition("hasItem", "cool dog"))


function checkCondition(condition, detail) {
    switch (condition) {
        case "hasItem":
            return gameState.currentPlayer.inventory.hasOwnProperty(detail)
        case "hasVisited":
            return gameState.currentPlayer["visited scenes"].includes(Number(detail))
        case "hasProgress":
            return gameState.currentPlayer.progress.hasOwnProperty(detail)
        default: 
            return true
    }
}

function getItem(item) {

}

function movePlayer(scene) {

}

function getProgress(progress) {

}

function loseItem(item) {

}

module.exports = {
    checkCondition
}