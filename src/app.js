const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const searchRouter = require('./search-router')
const fetch = require('node-fetch')

const app = express()

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test',
}))
app.use(cors())
app.use(helmet())

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.get('/:keyword', (req, res) => {
  const { keyword } = req.params

  const url = `https://api.stocktwits.com/api/2/streams/symbol/${keyword}.json`
  fetch(url)
      .then(res => res.json())
      .then(stock=> res.send(stock))
})

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: 'server error' }
  } else {
    console.error(error)
    response = { error: error.message, details: error }
  }
  res.status(500).json(response)
})

module.exports = app
