const express = require('express')
const app = express()
const {getArticle, getArticles} = require('./controllers/Articles.controller')
const {getTopics} = require('./controllers/Topics.controller')
const {getComments} = require('./controllers/Comments.controller')
const {endPoints} = require('./endpoints')


app.get('/api', endPoints)
app.get('/api/topics', getTopics)
app.get('/api/articles/:article_id/comments', getComments)
app.get('/api/articles', getArticles)
app.get('/api/articles/:article_id', getArticle)

//Errorhandling
app.use((err, req, res, next) => {
    if(err.code === "42703"){
    res.status(400).send('Invalid input!')}
    if(err.rowCount === 0){
      res.status(404).send('Article not found')
    }
    else res.status(500).send({msg: 'Internal Server Error'})
  });


module.exports = app;