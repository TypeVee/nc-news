const express = require('express')
const app = express()
const {getArticle} = require('./controllers/Articles.controller')
const {getTopics} = require('./controllers/Topics.controller')
const {endPoints} = require('./endpoints')
const {getArticles} = require("./controllers/Articles.controller")

app.get('/api', endPoints)
app.get('/api/topics', getTopics)
app.get('/api/articles', getArticles)
app.get('/api/articles/:article_id', getArticle)



module.exports = app;