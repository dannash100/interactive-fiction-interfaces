import request from 'superagent'

const rootUrl = 'http://localhost:3000/api/game'

export function getScenes () {
   return request.get(rootUrl)
}

export function getScene (sceneId) {
    if (sceneId !== null) {
        console.log(sceneId)
    return request.post(rootUrl + "/scene")
    .send({sceneId})
    }
}

export function getGraph () {
    return request.get(rootUrl + "/graph")
}

export function postScene (sceneName) {
    return request.post(rootUrl)
    .send(sceneName)
}