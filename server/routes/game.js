const {createGraph} = require("../node-graph/index")

const express = require('express')
const router = express.Router()
const db = require('../../db')
var cors = require('cors')

router.use(cors())

router.get('/', (req, res, next) => {
    return db.getScenes().then(scenes => {
        res.json(scenes)
    })
})

router.get('/graph', (req, res, next) => {
    return db.getScenes().then(scenes => {
        let graph = createGraph(scenes)
        res.json(graph)
    })
})

router.put('/link', (req, res, next) => {
    const {id, linkId, direction} = req.body
    return db.linkScene(id, linkId, direction)
        .then(() => {
            return db.linkSceneOpposite(id, linkId, direction)
        })
        .then(() => {
            res.sendStatus(201)
        })
        .catch(err => {
            console.log(err)
        })
})


router.post('/scene', (req, res, next) => {
    let id = req.body.sceneId
    return db.getScene(id)
        .then((scene) => {
            res.json(scene)
        })
        .catch(err => {
            console.log(err)
        })
})


router.post('/', (req, res, next) => {
    let scene = req.body
    return db.addScene(scene)
        .then((id) => {
            res.json(id)
        })
        .catch(err => {
            console.log(err)
        })
})



module.exports = router