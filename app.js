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
    else res.status(500).send({msg: 'Internal Server Error'})
  });

module.exports = app;