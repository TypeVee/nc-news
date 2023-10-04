const {fetchComments} = require("../models/Comments.controller")

exports.getComments = ((req, res, next)=>{
    fetchComments(req.params.article_id).then((comments)=>{
        if(comments.code === '42703'){next(comments)}
        else if(comments.length === 0){res.status(404).send({msg:"Article not found"})}
        else{
            res.status(200).send(comments)
    }})
})