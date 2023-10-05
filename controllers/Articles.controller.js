const {findArticle, fetchArticles} = require('../models/Articles.model')

exports.getArticle = ((req, res, next)=>{
    findArticle(req.params.article_id)
    .then((article)=>{
        if(article.code === '42703'){res.status(400).send()}
        if(article === "No article found"){res.status(404).send()}
        else
                res.status(200)
                .send(article)
    })
    .catch((err)=>{
        next(err)
    })
})
exports.getArticles = (req, res, next)=>{
    fetchArticles()
    .then((articles)=>{
        res.status(200).send(articles)
        
    })
    .catch((err)=>{
        return err
    })
