const {fetchComments, insertComments} = require("../models/Comments.model")

exports.getComments = ((req, res, next)=>{
    fetchComments(req.params.article_id)
    .then((comments)=>{
            res.status(200).send(comments)
    })
    .catch((err)=>{
        next(err)})
})

exports.postComments = (req, res, next)=>{
    insertComments(req.params.article_id, req.body)
    .then((response)=>{
        res.status(201).send({postedComment: response})
    })
    .catch((err)=>{
    next(err)})
}