const {currentPlayer, getItem, getProgress, loseProgress} = require('./gamestate')





function checkCondition(condition, detail) {
    switch (condition) {
        case "hasItem":
            return currentPlayer.inventory.hasOwnProperty(detail)
        case "hasNotItem":
            return !currentPlayer.inventory.hasOwnProperty(detail) && !currentPlayer.itemsUsed.includes(detail)
        case "hasUsed":
            return currentPlayer.inventory.hasOwnProperty(detail) || currentPlayer.itemsUsed.includes(detail) 
        case "hasVisited":
            return currentPlayer["visited scenes"].includes(Number(detail))
        case "hasNotVisited":
            return !currentPlayer["visited scenes"].includes(Number(detail))
        case "hasProgress":
            return currentPlayer.progress[detail]
        case "hasNotProgress":
            return !currentPlayer.progress[detail]
        default:
            return true
    }
}

function checkEvent(event, detail) {
    switch (event) {
        case "getItem":
            return getItem(detail)
        case "loseItem":
            return loseItem(detail)
        case "getProgress":
            return getProgress(detail)
        case "loseProgress":
            return loseProgress(detail)
        case "movePlayer":
            return changeScene(detail)
        default:
            return
    }
}

module.exports = {
    checkCondition,
    checkEvent
}