const {fetchComments} = require("../models/Comments.model")

exports.getComments = ((req, res, next)=>{
    fetchComments(req.params.article_id)
    .then((comments)=>{
            res.status(200).send(comments)
    })
    .catch((err)=>{ //fish zone
        next(err)})
})