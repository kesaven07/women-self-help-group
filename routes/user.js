const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin  = require('../middleware/requireLogin')
//const Post =  mongoose.model("Post")
const User = mongoose.model("User")


router.get('/user/:id',(req,res)=>{
    User.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
         
             res.json({user})
         
    }).catch(err=>{
        return res.status(404).json({error:"User not found"})
    })
})




router.post('/search-users',(req,res)=>{
    let userPattern = new RegExp("^"+req.body.query)
    User.find({email:{$regex:userPattern}})
    .select("_id email")
    .then(user=>{
        res.json({user})
    }).catch(err=>{
        console.log(err)
    })

})



module.exports = router