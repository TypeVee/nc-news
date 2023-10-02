const Express = require('express')
const app = Express()
app.use(Express.json())
const {getTopics} = require('./controllers/Topics.controller')

app.get('/api/topics', getTopics)

module.exports = app;