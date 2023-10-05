const db = require("../db/connection")

exports.findArticle = (id)=>{
    return db.query(`SELECT * FROM articles
    WHERE article_id = ${id};`).then((article)=>{
        if(article.rowCount === 0){return "No article found"}
        return {'article': article.rows[0]}
    })
    .catch((err)=>{return err})
}