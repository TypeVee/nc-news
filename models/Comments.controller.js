const db = require("../db/connection")

exports.fetchComments = (articleID) =>{
    return db.query(`SELECT * FROM comments WHERE article_id = ${articleID};`)
        .then((res)=>{return res.rows})
        .catch((err)=>{return err})
}