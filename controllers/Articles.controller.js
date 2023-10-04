const {fetchArticles} = require('../models/Articles.model')

exports.getArticles = (req, res, next)=>{
    fetchArticles()
    .then((articles)=>{
        res.status(200).send(articles)
        
    })
    .catch((err)=>{
        return err
    })
}