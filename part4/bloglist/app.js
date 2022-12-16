const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const BlogsRouter = require('./controllers/blog')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const morgan = require('morgan')

morgan.token('body', (req) => { return JSON.stringify(req.body) })

logger.info('Connecting to mongoDB', config.MONGODB_URI)
mongoose.set('strictQuery', true)
mongoose.connect(config.MONGODB_URI)
.then(() => {
    logger.info('Connected to mongoDB')
})
.catch((error) => {
    logger.error(error)
})


app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.use(express.json())
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', BlogsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app