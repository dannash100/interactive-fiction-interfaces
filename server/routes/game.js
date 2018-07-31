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

router.post('/', (req, res, next) => {
    let scene = req.body
    return db.addScene(scene)
    .then(() => {
        res.sendStatus(200)
    })
    .catch(err => {
        console.log(err)
    })
})


module.exports = router