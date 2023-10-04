const Express = require('express')
const app = Express()
app.use(Express.json())
const {getTopics} = require('./controllers/Topics.controller')
const {endPoints} = require('./endpoints')
const {getComments, postComments} = require('./controllers/Comments.controller')


app.get('/api', endPoints)
app.get('/api/topics', getTopics)
app.get('/api/articles/:article_id/comments', getComments)

app.post('/api/articles/:article_id/comments', postComments)

//Errorhandling
app.use((err, req, res, next) => {
    if(err.code === "42703"){
    res.status(400).send('Invalid input')}
    if(err.code === "23503"){
    res.status(403).send("Not a registed user")}
    if(err.rowCount === 0){
      res.status(404).send('Article not found')
    }
    else res.status(500).send({msg: 'Internal Server Error'})
  });

app.post('/api/articles/:article_id/comments')

module.exports = app;