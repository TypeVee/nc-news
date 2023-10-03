const db = require("../db/connection")

exports.findArticle = (id)=>{
    return db.query(`SELECT * FROM articles
    WHERE article_id = ${id};`)
}