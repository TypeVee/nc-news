const Express = require('express')
const app = Express()
const {getTopics} = require('./controllers/Topics.controller')
const {endPoints} = require('./endpoints')
const {getArticles} = require("./controllers/Articles.controller")

app.get('/api', endPoints)
app.get('/api/topics', getTopics)
app.get('/api/articles', getArticles)


module.exports = app;