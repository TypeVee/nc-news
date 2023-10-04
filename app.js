const Express = require('express')
const app = Express()
const {getTopics} = require('./controllers/Topics.controller')
const {endPoints} = require('./endpoints')
const {getComments} = require('./controllers/Comments.controller')


app.get('/api', endPoints)
app.get('/api/topics', getTopics)
app.get('/api/articles/:article_id/comments', getComments)

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