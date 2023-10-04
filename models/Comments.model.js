const db = require("../db/connection")

exports.fetchComments = (articleID) =>{
    return db.query(`SELECT * FROM comments WHERE article_id = ${articleID} ORDER BY created_at desc;`)
        .then((res)=>{
            if(res.rowCount === 0){throw res}
            return res.rows
        })
}