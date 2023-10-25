const {fetchComments, insertComments, deleteComment} = require("../models/Comments.model")

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

exports.removeComment = (req, res, next)=>{
    deleteComment(req.params.comment_id)
    .then(()=>{
        res.status(204).send()
    })
    .catch((err)=>{
        next(err)
    })
}