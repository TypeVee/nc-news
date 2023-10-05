const {updateVotes, findArticle, fetchArticles} = require('../models/Articles.model')


exports.sendVote = (req, res, next)=>{
    if(req.body.inc_votes === undefined || typeof req.body.inc_votes !== "number"){throw {code: '400'}}
    updateVotes(req.params.article_id, req.body.inc_votes).then((response)=>{
        res.status(200).send(response)
      })
    .catch((err)=>{
        next(err)
    })

exports.getArticle = ((req, res, next)=>{
    findArticle(req.params.article_id)
    .then((article)=>{
        if(article.code === '42703'){res.status(400).send()}
        if(article === "No article found"){res.status(404).send()}
        else res.status(200).send(article)}
})
exports.getArticles = (req, res, next)=>{
    fetchArticles()
    .then((articles)=>{
        res.status(200).send(articles)
    })
    .catch((err)=>{
        return err
    })
