import request from 'superagent'

const rootUrl = 'http://localhost:3000/api/game'

export function getScenes () {
   return request.get(rootUrl)
}