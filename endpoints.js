const fs = require("fs")

exports.endPoints = ((req, res)=>{
    
    fs.readFile('./endpoints.json', (err, data)=>{if(err) res.status(500).send(err)
        else res.status(200).send(JSON.parse(data))
    })
})