const {currentPlayer, checkCondition} = require('../../gamestate')

describe('checkCondition', () => {
    
    test('hasItem true', () => {
        currentPlayer.inventory.dogshead = 'dogshead'
        let actual = checkCondition('hasItem', 'dogshead')
        expect(actual).toBeTruthy()
    })

    test('hasItem false', () => {
        let actual = checkCondition('hasItem', 'catshead')
        expect(actual).toBeFalsy()
    })

    test('hasNotItem true', () => {
        let actual = checkCondition('hasNotItem', 'catshead')
        expect(actual).toBeTruthy()
    })

    test('hasNotItem false', () => {
        let actual = checkCondition('hasNotItem', 'dogshead')
        expect(actual).toBeFalsy()
    })

    test('hasUsed true', () => {
        currentPlayer.itemsUsed.push('dogfood')
        let actual = checkCondition('hasUsed', 'dogfood')
        expect(actual).toBeTruthy()
    })

    test('hasUsed false', () => {
        let actual = checkCondition('hasUsed', 'catfood')
        expect(actual).toBeFalsy()
    })

    test('hasVisited true', () => {
        currentPlayer['visited scenes'].push(3)
        let actual = checkCondition('hasVisited', '3')
        expect(actual).toBeTruthy()
    })

    test('hasVisited false', () => {
        let actual = checkCondition('hasVisited', '4')
        expect(actual).toBeFalsy()
    })

    test('hasNotVisited true', () => {
        let actual = checkCondition('hasNotVisited', '4')
        expect(actual).toBeTruthy()
    })

    test('hasNotVisited true', () => {
        let actual = checkCondition('hasNotVisited', '3')
        expect(actual).toBeFalsy()
    })

    test('hasProgress true', () => {
        currentPlayer.progress.isTest = true
        let actual = checkCondition('hasProgress', 'isTest')
        expect(actual).toBeTruthy()
    })

    test('hasProgress false', () => {
        let actual = checkCondition('hasProgress', 'isNotTest')
        expect(actual).toBeFalsy()
    })

    test('hasNotProgress', () => {
        let actual = checkCondition('hasNotProgress', 'isTest')
        expect(actual).toBeFalsy()
    })

    test('hasNotProgress', () => {
        let actual = checkCondition('hasNotProgress', 'isNotTest')
        expect(actual).toBeTruthy
    })
})
