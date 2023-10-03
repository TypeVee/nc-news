const Express = require('express')
const app = Express()
const {getArticle} = require('./controllers/Articles.controller')

app.get('/api/articles/:article_id', getArticle)

module.exports = app;