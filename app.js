const Express = require('express')
const app = Express()
const {getTopics} = require('./controllers/Topics.controller')
const {endPoints} = require('./endpoints')

app.get('/api', endPoints)
app.get('/api/topics', getTopics)

app.post('/api/articles/:article_id/comments')

module.exports = app;