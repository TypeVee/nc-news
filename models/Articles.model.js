const db = require("../db/connection")

exports.updateVotes = (id, updateValue)=>{
    return db.query(`UPDATE articles
        SET votes = votes + ${updateValue}
        WHERE article_id = ${id}
        RETURNING *`).then((article)=>{
            if(article.rowCount === 0){throw article}
            return article.rows[0]})
}