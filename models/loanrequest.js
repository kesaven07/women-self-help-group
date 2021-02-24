const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    memberName:{
        type:String,
        required:true
    },
    groupName:{
        type:String,
        required:true
    },
    result:{
        type:String,
        default:"pending"
    }
    
},{timestamps:true})

mongoose.model("Loanrequest",postSchema)
