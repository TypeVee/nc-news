const {fetchArticles} = require('../models/Articles.model')
const {countCommentsByArticleID} = require("../models/Comments.model")

exports.getArticles = (req, res, next)=>{
    fetchArticles()
    .then((articles)=>{
        const commentPromises = []
        articles.forEach((article)=>{
            commentPromises.push(countCommentsByArticleID(article.article_id))
        })
        Promise.all(commentPromises).then((commentCounts)=>{
            articles.map((article, index)=>{
                article.comment_count = commentCounts[index]
                delete article.body})
            res.status(200).send(articles)
        })
        
    })
    .catch((err)=>{return err})
}