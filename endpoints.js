const fs = require("fs")

exports.endPoints = ((req, res, next)=>{
    
    fs.readFile('./endpoints.json', (err, data)=>{if(err) next(err)
        else res.status(200).send(JSON.parse(data))
    })
})