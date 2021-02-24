const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    members:
    [
        {
            type:String,
        },
    ]
    
},{timestamps:true})

mongoose.model("Group",postSchema)
