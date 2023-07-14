const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const { post } = require("./auth")
const requirelogin= require('../middleware/requireLogin')
const Post = mongoose.model("Post")

router.get('/allpost',requirelogin,(req,res) => {
    Post.find()
    .populate('postedBy','_id name ')
    .then(posts=>{
        res.json({post: posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post("/createpost",requirelogin,(req, res) => {
    const {title, body, photo} = req.body
    if(!title || !body || !photo){
        return res.status(404).json({error: "Invalid post (Please add all fields)"})
    }
    // console.log(req.user)
    req.user.password = undefined
    const post = new Post({
        title: title,
        body: body,
        photo,
        postedBy: req.user
    })
    post.save()
    .then(result=>{
                res.json({post:result})
    })
    .catch(err=>{
                console.log(err)
    })
});

router.get('/myfeed',requirelogin,(req, res)=>{
    Post.find({postedBy:req.user._id})
    .populate('postedBy','_id name')
    .then(myposts=>{
        res.json({post: myposts})
    })
    .catch(err=>{
        console.log(err)
    })
})

 

module.exports = router