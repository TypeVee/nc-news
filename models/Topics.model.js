const db = require("../db/connection")

exports.FetchAll = () =>{
    return db.query('SELECT * FROM topics;')
    .then((result)=>{
        return result.rows
    })
}