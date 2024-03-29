const db = require("../db/connection")


exports.updateVotes = (id, updateValue)=>{
    return db.query(`UPDATE articles
        SET votes = votes + ${updateValue}
        WHERE article_id = ${id}
        RETURNING *`).then((article)=>{
            if(article.rowCount === 0){throw article}
            return article.rows[0]})
}

exports.fetchArticles = (userQuery) =>{
    if(userQuery === undefined){ //I am a victim of my own spaghetti code
        return Promise.all([db.query(
        `SELECT * 
        FROM articles
        ORDER BY article_id
        `
        ), db.query(`
        SELECT * FROM comments ORDER BY article_id`
        )]).then(([articles, comments])=>{
            if(articles.rowCount === 0){return {articles: []}}
            else 
            {const articleWithCount = articles.rows.map((article)=>{
                article.comment_count = 0
                for(i=0;i<comments.rows.length;i++){
                    if(comments.rows[i].article_id === article.article_id){
                        article.comment_count++
                        delete comments.rows[i].article_id
                    }
                }
                delete article.body
                return article
            })
            return {'articles': articleWithCount.sort((a, b) => {return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()})}}
        })}
    else{return Promise.all([db.query(
        `SELECT * 
        FROM articles WHERE topic = '${userQuery}'
        ORDER BY article_id
        ;
        `
        ), db.query(`
        SELECT * FROM comments ORDER BY article_id`
        )]).then(([articles, comments])=>{
            if(articles.rowCount === 0){return {articles: []}}
            else 
            {const articleWithCount = articles.rows.map((article)=>{
                article.comment_count = 0
                for(i=0;i<comments.rows.length;i++){
                    if(comments.rows[i].article_id === article.article_id){
                        article.comment_count++
                        delete comments.rows[i].article_id
                    }
                }
                delete article.body
                return article
            })
            return {'articles': articleWithCount.sort((a, b) => {return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()})}
    }})
}}
            // else articles.rows.forEach((article) =>{ //We could just use a map here, that'd be nicer
            //     article.comment_count = 0
            //     delete article.body
            //     console.log(article.comment_count)
            //         })
            // for(const comment of comments.rows){
            //     if(comment.article_id === comment.article_id){
            //     articles.rows[comment.article_id-1].comment_count++}
            //         }
    //         return {'articles': articles.rows.sort((a, b) => {return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()})}
    //     })}
    // }

exports.findArticle = (id)=>{
    return db.query(`SELECT * FROM articles
    WHERE article_id = ${id};`).then((article)=>{
        if(article.rowCount === 0){return "No article found"}
        return {'article': article.rows[0]}
    })
    .catch((err)=>{return err})
}

