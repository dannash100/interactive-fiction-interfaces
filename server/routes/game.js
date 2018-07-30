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


module.exports = router