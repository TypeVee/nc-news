const db = require("../db/connection")

exports.fetchComments = (articleID) =>{
    return Promise.all([db.query(`Select * FROM comments WHERE article_Id = ${articleID} ORDER BY created_at desc`), db.query(`SELECT * FROM articles WHERE article_id = ${articleID}`)])
        .then(([res, check])=>{
            if(res.rowCount === 0 && check.rowCount === 0){throw res}
             return res.rows
        })
}

exports.insertComments = (ID, {username, body})=>{
    return db.query(
            `INSERT INTO comments 
                (body, author, article_id)
            VALUES
                ($1, $2, $3)
            RETURNING body
            `, [body, username, ID]).then((comment)=>{return comment.rows[0].body})
            
}