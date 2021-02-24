const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        required:true
    },
    groupJoined:{
        type:Boolean,
        default:false
    },
    haveTakenLoan:{
        type:Boolean,
        default:false
    },
    loanStatus:{
        type:String,
        default:'pending',
    },
    groupName:{
        type:String,
    },
})

mongoose.model("User",userSchema)