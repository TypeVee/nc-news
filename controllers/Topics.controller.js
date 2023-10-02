const {FetchAll} = require("../models/Topics.model")

exports.getTopics = ((req, res)=>{
    FetchAll()
    .then((topics)=>{
        res.status(200).send(topics)
    })
    .catch((err)=>{res.status(404).send(err)})
})