const {FetchAll} = require("../models/Topics.model")

exports.getTopics = ((req, res, next)=>{
    FetchAll()
    .then((topics)=>{
        res.status(200).send(topics)
    })
    .catch((err)=>{
        next(err)
    })
})