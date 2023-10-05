const {updateVotes} = require('../models/Articles.model')


exports.sendVote = (req, res, next)=>{
    if(req.body.inc_votes === undefined){throw {code: '400'}}
    updateVotes(req.params.article_id, req.body.inc_votes).then((response)=>{
        res.status(200).send(response)
    })
    .catch((err)=>{
        next(err)
    })
}