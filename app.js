const Express = require('express')
const app = Express()
const {getArticle} = require('./controllers/Articles.controller')
const {getTopics} = require('./controllers/Topics.controller')
const {endPoints} = require('./endpoints')

app.get('/api', endPoints)
app.get('/api/topics', getTopics)
app.get('/api/articles/:article_id', getArticle)

module.exports = app;