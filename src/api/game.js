import request from 'superagent'

const rootUrl = 'http://localhost:3000/api/game'

export function getScenes () {
   return request.get(rootUrl)
}

export function getGraph () {
    return request.get(rootUrl + "/graph")
}