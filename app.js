const Express = require('express')
const app = Express()
const {getTopics} = require('./controllers/Topics.controller')
const {endPoints} = require('./endpoints')
const {getArticle} = require('./controllers/Articles.controller')

app.get('/api/topics', getTopics)

app.get('/api/articles/:article_id', getArticle)

module.exports = app;