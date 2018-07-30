const EMPTY_TYPE = "empty";
const SPECIAL_TYPE = "special";
const SPECIAL_EDGE_TYPE = "specialEdge";

let data = {
  "north": [0, -400],
  "south": [0, 400],
  "east": [400, 0],
  "west": [-400, 0],
  "northeast": [400, -400],
  "northwest": [-400, -400],
  "southwest": [400, 400],
  "southeast": [-400, 400]
}

let graph = {
  "nodes": [],
  "edges": []
}


const startingNode = scene => {
  let node = {
    "id": scene.id,
    "title": scene.name,
    "x": 0,
    "y": 0,
    "type": SPECIAL_TYPE
  }
  graph["nodes"].push(node)
}

const newNode = (newScene, sceneId, directions) => {
  if (!(graph["nodes"].find(node => node["id"] === newScene.id))) {
    let previousNode = graph["nodes"].find(node => node["id"] === sceneId)
    let node = {
      "id": newScene.id,
      "title": newScene.name,
      "x": previousNode["x"] + directions[0],
      "y": previousNode["y"] + directions[1],
      "type": EMPTY_TYPE,
    }
    graph["nodes"].push(node)
  }
  if (!(graph["edges"].find(edge => edge["source"] === newScene.id && edge["target"] === sceneId))) {
    let edge = {
      "source": sceneId,
      "target": newScene.id,
      "type": SPECIAL_EDGE_TYPE
    }
    graph["edges"].push(edge)
  }
}

function createGraph(sceneData) {
  sceneData.forEach((scene, i, arr) => {
    if (!i) startingNode(scene)
    Object.keys(data).forEach(direction => {
      if (scene[direction]) newNode(arr.find(x => x.id === scene[direction]), scene.id, data[direction])
    })
  })
  console.log(graph)
  return graph
}


module.exports = {
  createGraph
}