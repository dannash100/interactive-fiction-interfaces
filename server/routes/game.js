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


module.exports = router