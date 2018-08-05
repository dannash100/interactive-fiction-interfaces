import request from 'superagent'

const rootUrl = 'http://localhost:3000/api/game'

export function getScenes () {
   return request.get(rootUrl)
}

export function getScene (sceneId) {
    if (sceneId !== null) {
    return request.post(rootUrl + "/scene")
    .send({sceneId})
    }
}

export function linkScene(id, linkId, direction) {
    return request.put(rootUrl + "/link")
    .send({
        id: id,
        linkId: linkId,
        direction: direction,
    })
}

export function getGraph () {
    return request.get(rootUrl + "/graph")
}

export function postScene (sceneName) {
    return request.post(rootUrl)
    .send(sceneName)
}