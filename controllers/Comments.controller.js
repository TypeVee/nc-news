const {fetchComments, insertComments} = require("../models/Comments.model")

exports.getComments = ((req, res, next)=>{
    fetchComments(req.params.article_id)
    .then((comments)=>{
            res.status(200).send(comments)
    })
    .catch((err)=>{
        next(err)})
})
//23503
exports.postComments = (req, res, next)=>{
    insertComments(req.params.article_id, req.body)
    .then((response)=>{
        res.status(201).send({postedComment: response})
    })
    .catch((err)=>{console.log(err)
    next(err)})
}