const express = require('express')
const server = express()
const path = require('path')
var cors = require('cors')

server.use(express.json())

const pathToPublic = path.join(__dirname, '../public')

const router = require('./routes/game')

server.use(express.static(pathToPublic))
server.use('/api/game', router)


module.exports = server