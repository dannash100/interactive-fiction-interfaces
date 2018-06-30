const db = require('./db')
const {checkCondition} = require('./events_conditions')

let currentScene = {}


setUpScene(1)

const firstCondition = ({condition, detail, path}) => {
 if (!checkCondition(condition, detail)) currentScene[path] = 0 
} 

const secondCondition = ({condition2, detail2, path2}) => {
  if (!checkCondition(condition2, detail2)) currentScene[path2] = 0
}

const itemConditions = ({itemName, itemName2}) => {
  if (checkCondition("hasUsed", itemName)) currentScene.itemName = null
  if (checkCondition("hasUsed", itemName2)) currentScene.itemName2 = null
}

function setUpScene(sceneId) {
  db.getScene(sceneId).then(scene => {
    currentScene = scene
    firstCondition(currentScene)
    secondCondition(currentScene)
    itemConditions(currentScene)
    console.log(currentScene)
      
    
      
    })


  // defines movement options
  // conditions, defines fiter, displays message, displays conditional messages
  // asks for prompt
  // processes prompt
  // types of prompts- active prompts- change scene, passive prompts- replay scene and conditonal messages mayby changed

}




function playScene(scene) {


}
