const { checkMove, checkGlobal, checkVerbs, runFilter } = require('../../input')

jest.mock('../../display', () => ({
    printAnswer: reply => reply,
    printInventory: e => e
}))

describe("Input", () => {

    test("checkMove identifies correct direction with variation and returns false if not", () => {

        let data = {
            'NORTH': 'north',
            ['GO EAST']: 'east',
            'N': 'north',
            'SOUTHWEST': 'southwest',
            ['MOVE NORTH']: 'north',
            'E': 'east',
            'SE': 'southeast',
            ['GO SOUTHEAST'] : 'southeast',
            ['WALK WEST'] : 'west',
            'NE': 'northeast',
            ['WALK NORTHEAST']: 'northeast',
            ['GET COFFEE']: false,
            ['MOVE TO DOG']: false,
            'MOVE': false
            
        }   

        Object.keys(data).forEach(key => {
            const actual = checkMove(key, 'test')
            const expected = data[key]
            expect(actual).toBe(expected)
        })
    })

    test("checkGlobal finds correct command with variation and returns false if not", () => {

        let data = {
            'INVENTORY': 'inventory',
            ['OPEN INVENTORY']: 'inventory',
            'LOOK': 'look',
            ['LOOK AROUND']: 'look',
            ['LOOK IN BAG']: 'inventory',
            ['LOOK IN INVENTORY']: 'inventory',
            'SAVE': 'save',
            ['SAVE PROGRESS'] : 'save',
            'LOAD' : 'load',
            ['LOAD GAME']: 'load',
            ['LOOK AT']: false,
            ['LOOK INSIDE']: false,
            ['GET INVENTORY']: false
            
        }   

        Object.keys(data).forEach(key => {
            const actual = checkGlobal(key)
            const expected = data[key]
            expect(actual).toBe(expected)
        })

    })

    test("checkVerbs finds correct command with action type and returns type of other if none found", () => {


        let data = {
            ['LOOK AT DOG']: [ 'DOG', 'lookAt' ],
            ['LOOK AT THE DOG']: [ 'DOG', 'lookAt' ],
            ['PULL DOG']: [ 'DOG', 'pull' ],
            ['PUSH THE DOG']: [ 'DOG', 'push' ],
            ['LOOK INSIDE DOG']: [ 'DOG', 'lookIn' ],
            ['LOOK IN DOG']: [ 'DOG', 'lookIn' ],
            ['TAKE THE DOG']: [ 'DOG', 'take' ],
            ['TAKE DOG'] : [ 'DOG', 'take' ],
            ['GET DOG'] : [ 'DOG', 'take' ],
            ['OPEN THE DOG']: [ 'DOG', 'open' ],
            ['CLOSE DOG']: [ 'DOG', 'close' ],
            ['DRINK THE DOG']: [ 'DOG', 'drink' ],
            ['EAT DOG']: [ 'DOG', 'eat' ],
            ['READ THE DOG']: [ 'DOG', 'read' ],
            ['THINK ABOUT THE DOG']: [ 'THINK ABOUT THE DOG', 'other' ],
            ['BELEIVE IN THE DOG']: [ 'BELEIVE IN THE DOG', 'other' ]
        }   

        Object.keys(data).forEach(key => {
            const actual = checkVerbs(key)
            const expected = data[key]
            expect(actual).toEqual(expected)
        })

    })

  
    
    test("runFilter matches words and returns default response if not found", () => {
  
        const expected = "I didn't understand your request to dog"
        const actual = runFilter('dog', [], 'other').trim()

        expect(actual).toBe(expected)

    })
})
