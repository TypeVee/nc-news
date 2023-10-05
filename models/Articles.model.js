const db = require("../db/connection")


exports.updateVotes = (id, updateValue)=>{
    return db.query(`UPDATE articles
        SET votes = votes + ${updateValue}
        WHERE article_id = ${id}
        RETURNING *`).then((article)=>{
            if(article.rowCount === 0){throw article}
            return article.rows[0]})
}

exports.fetchArticles = () =>{
    return Promise.all([db.query(
        `SELECT * 
        FROM articles
        ORDER BY article_id
        `
        ), db.query(`
        SELECT * FROM comments ORDER BY article_id`
        )]).then(([articles, comments])=>{
            articles.rows.forEach((article) =>{
                article.comment_count = 0
                delete article.body
                    })
            for(const comment of comments.rows){
                articles.rows[comment.article_id-1].comment_count++
                    }
            return {'articles': articles.rows.sort((a, b) => {return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()})}
        })
}

exports.findArticle = (id)=>{
    return db.query(`SELECT * FROM articles
    WHERE article_id = ${id};`).then((article)=>{
        if(article.rowCount === 0){return "No article found"}
        return {'article': article.rows[0]}
    })
    .catch((err)=>{return err})
}

