const { checkMove } = require('../../input')

describe("Input", () => {

    test("checkMove identifies correct direction and returns false if not", () => {

        let actual = []

        actual.push(checkMove('NORTH', 'test'))
        actual.push(checkMove('GO EAST', 'test'))
        actual.push(checkMove('N', 'test'))
        actual.push(checkMove('SOUTHWEST', 'test'))
        actual.push(checkMove('MOVE NORTH', 'test'))
        actual.push(checkMove('E', 'test'))
        actual.push(checkMove('SE', 'test'))
        actual.push(checkMove('GO SOUTHEAST', 'test'))
        actual.push(checkMove('WALK WEST', 'test'))
        actual.push(checkMove('NE', 'test'))
        actual.push(checkMove('WALK NORTHEAST', 'test'))
        actual.push(checkMove('GET COFFEE', 'test'))
        actual.push(checkMove('MOVE TO DOG', 'test'))
        actual.push(checkMove('MOVE', 'test'))

        let expected = ['north', 'east', 'north', 'southwest', 'north', 'east', 'southeast' ,'southeast' ,'west', 'northeast', 'northeast', false, false, false]

        expect(actual).toEqual(expected)

  
    })
})