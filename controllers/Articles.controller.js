const {findArticle} = require('../models/Articles.model')

exports.getArticle = ((req, res, next)=>{
    findArticle(req.params.article_id)
    .then((article)=>{
        if(article.rows.length === 0){res.status(400).send()}
        else res.status(200)
                .send({'article': article.rows[0]}
            )
    })
    .catch((err)=>{
        next(err)
    })
})