const data = require ('./gamestate')

/*Commands  
- check global commands 
- get text find what kind of action it is
- remove from string 
- analyze remaining words
- each item can have an alias in database- SO it can be bird - or red bird and get same action
- ultimatly it will filter through a database using where of scene and action type. 

- if active 


*/



const lookAt = ["look", "look at", "look to"]
      lookIn = ["look in", "look into", "look inside"]
      push = ["push", "move"]
      pull = ["pull"]
      take = ["pick up" , "pickup" , "take", ""]
      goNorth = ["N", "n", "go north", "walk north"]

      


      
      

       

     

function checkGlobal(words) {

}

//movement, pickup object anything that needs a scene change or refresh- including look

function checkMove() {

}

function checkAction() {

}

//local inconsiquential activities with small responses


function checkLocal(words, scene) {

}
