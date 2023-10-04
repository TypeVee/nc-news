const db = require("../db/connection")

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