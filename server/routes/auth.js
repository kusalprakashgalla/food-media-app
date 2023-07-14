const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const requireLogin = require("../middleware/requireLogin")
// const requirelogin= require('../middleware/requireLogin')

// router.get('/protected',requirelogin,function(req,res){
//     res.send("Protected content")
// })

router.get('/signin',function(req,res){
    res.send("UserId: password:")
});

router.post('/signup',function(req,res){
    const {name,email,password} =req.body
    if(!name||!email||!password){
        return res.status(422).json({error:"please add all the feields"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"User already exits with that email"})
        }
    
    bcrypt.hash(password,10)
    .then(hashedpassword=>{
        const user = new User({
            email,
            password:hashedpassword,
            name
        })
        user.save()
        .then(user=>{
            res.json({message:"saved succesfully"})
        })
        .catch(err=>{
            console.log(err)
        })
    })
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/signin',function(req,res)
{
    const{email,password} = req.body
    if(!email||!password){
        res.status(402).json({error:"please fill email/password"})
    }
    else if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        return res.status(422).json({erorr: "invalid email"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            res.status(402).json({error:"Incorrect username or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                //res.json({message:"logged in succesfully"})
                const {_id,email,password} = savedUser
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                res.json({token,user:{_id,email,password}})
            }
            else{
            res.status(402).json({error:"Incorrect username or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get("/profile",requireLogin,function(res,req){
    User.find({name:req.name})
    .then(result=>{
        const {name} = result
        res.json({user: {name}})
    })
    .catch(err=>{
        console.log(err)
    })



    const {dp} = req.body
    if(!dp){
        return res.status(404).json({error: "(Please add all fields)"})
    }
    req.user.password = undefined
    const post = new User({
        dp: dp,
    })
    post.save()
    .then(result=>{
                res.json({post:result})
    })
    .catch(err=>{
                console.log(err)
    })



})


module.exports = router