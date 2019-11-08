const express = require('express')

const searchRouter = express.Router()

searchRouter
    .route('/')
    .get((req, res) => {
        res.send('search')
    })


module.exports = searchRouter