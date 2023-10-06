
const Express = require('express')
const app = Express()
app.use(Express.json())
const {getTopics} = require('./controllers/Topics.controller')
const {endPoints} = require('./endpoints')
const {getArticle, getArticles, sendVote} = require('./controllers/Articles.controller')
const {getComments, postComments} = require('./controllers/Comments.controller')


app.get('/api', endPoints)
app.get('/api/topics', getTopics)
app.get('/api/articles/:article_id/comments', getComments)
app.get('/api/articles', getArticles)
app.get('/api/articles/:article_id', getArticle)

app.post('/api/articles/:article_id/comments', postComments)

app.patch('/api/articles/:article_id', sendVote)

//Errorhandling
app.use((err, req, res, next) => {
    if(err.code === '400') //Not enough data
      {res.status(400).send('Bad request')}
    if(err.code === "42703") //Not found
      {res.status(404).send('Invalid input')}
    if(err.code === "23503"){ //Invalid user/Article
      if(err.constraint === "comments_article_id_fkey")
        {res.status(404).send("Invalid Article")}
      else if(err.constraint === "comments_author_fkey")
        {res.status(403).send("Invalid Username")}
      }
    if(err.rowCount === 0)
      {res.status(404).send('Article not found')}
    else {res.status(500).send({msg: 'Internal Server Error'})}
  });

app.post('/api/articles/:article_id/comments')

module.exports = app;