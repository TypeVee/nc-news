const {updateVotes, findArticle, fetchArticles} = require('../models/Articles.model')


exports.sendVote = (req, res, next)=>{
    if(req.body.inc_votes === undefined){
        findArticle(req.params.article_id).then(({article})=>{
            res.status(200).send(article)})}
    else if(typeof req.body.inc_votes !== "number"){
        throw {code: '400'}}
    else updateVotes(req.params.article_id, req.body.inc_votes).then((updatedArticle)=>{
        res.status(200).send(updatedArticle)
      })
    .catch((err)=>{
        next(err)
    })
}

exports.getArticle = ((req, res, next)=>{
    findArticle(req.params.article_id)
    .then((article)=>{
        if(article.code === '42703'){res.status(400).send()}
        if(article === "No article found"){res.status(404).send()}
        else res.status(200).send(article)})
    .catch((err)=>{
        return err
    })
})

exports.getArticles = (req, res, next)=>{
    return fetchArticles(req.query.topic)
    .then((articles)=>{
        console.log(articles)
        res.status(200).send(articles)
    })
    .catch((err)=>{
        console.log(err)
        return err
    })
}
