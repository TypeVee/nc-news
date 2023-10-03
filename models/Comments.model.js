const db = require("../db/connection")

exports.countCommentsByArticleID = (articleID)=>{
    return db.query(`SELECT * FROM comments WHERE article_ID = ${articleID};`)
    .then((results)=>{
        return results.rows.length
    })
}