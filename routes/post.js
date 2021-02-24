const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin  = require('../middleware/requireLogin')
const Group =  mongoose.model("Group")
const User =  mongoose.model("User")
const  Loanrequest=  mongoose.model("Loanrequest")


router.get('/allGroups',async (req,res)=>{
    try {
    const allGroups = await Group.find({})
        if(allGroups){
            res.json({allGroups:allGroups})
        }
        else{
            res.json({allGroups:[]})
        }
    console
    }
    catch (e) {
        console.log('error', e);
    }  
})

router.post('/joinGroup',async (req,res)=>{
    try{
        const { userEmail,groupName} = req.body 
        const group = await Group.findOne({name:groupName})
        const user = await User.findOne({ email:userEmail})
        group.members.push(user.name);
        await group.save();
        user.groupJoined = true;
        user.groupName = groupName
        await user.save();
        console.log(req.body)
        res.json({message:"Joined Group successfullyy", members:group.members})
    }
    catch (e) {
        console.log('error', e);
    }    
})

router.post('/requestLoan',async (req,res)=>{
    try{
        const { userName} = req.body 
        const user = await User.findOne({ name:userName})
        console.log('the real data ---before',user)
        user.haveTakenLoan = true
        user.loanStatus = 'pending'
        await user.save();
        console.log("after submission",user)
        const groupName = user.groupName
        const memberName = userName
        const newRequest = new Loanrequest({
            memberName,
            groupName
        })
        console.log(newRequest )
        newRequest.save().then(result=>{
            res.json({newRequest:newRequest})
        })
        .catch(err=>{
            console.log(err)
        })
        
    }
    catch (e) {
        console.log('error', e);
    }    
})


router.get('/isGroupJoined/:email',async (req,res)=>{
    try {

    let groupJoined = false;
    let haveTaken = false;
    let loanStatus = 'pending'
    const userEmail = req.params.email
    const user = await User.findOne({email:userEmail})
    console.log('the real data',user)
    if(user){
        groupJoined = user.groupJoined
        haveTaken = user.haveTakenLoan
        loanStatus = user.loanStatus
    }
    res.json({groupJoined:groupJoined,haveTaken:haveTaken,loanStatus:loanStatus})
      
    }
    catch (e) {
        console.log('error', e);
    }  
})
router.get('/loanAmount/:email',async (req,res)=>{
    try {
    const userEmail = req.params.email
    const user = await User.findOne({email:userEmail})
    const group = await Group.findOne({name:user.groupName})
   let loanAmount = 100000
   let dueAmount = 0
    if(user && group){
        console.log('members.length',group.members.length)
        dueAmount = Math.floor(loanAmount/group.members.length);
        
    }
    res.json({dueAmount:dueAmount})
      
    }
    catch (e) {
        console.log('error', e);
    }  
})
router.get('/allMembersList/:email',async (req,res)=>{
    try {
    //console.log('member-list-body',req.params)
    const  userEmail  = req.params.email
    let groupMembers = []; 
    const user = await User.findOne({email:userEmail})
    if(user){
        const group = await Group.findOne({name:user.groupName})
        if(group){
            const group = await Group.findOne({name:user.groupName})
            //console.log(group,'grup-name')  
            for(let i =0 ; i<group.members.length; i++){
                groupMembers.push(group.members[i])
            }
        }
    }   
    
    //console.log('groupy',groupMembers)
    res.json({members:groupMembers})
      
    }
    catch (e) {
        console.log('error', e);
    }  
})


router.get('/loanRequests/:email',async (req,res)=>{
    try {
    const userEmail = req.params.email
    const user = await User.findOne({email:userEmail})
    let loanRequests  = []
    if(user){
        const group = await Group.findOne({name:user.groupName})
        loanRequests = await Loanrequest.find({groupName:group.name,result:'pending'})
        console.log('the loan req',loanRequests)
    }
   
    
    res.json({loanRequests:loanRequests})
      
    }
    catch (e) {
        console.log('error', e);
    }  
})

router.post('/newGroup',async (req,res)=>{
    const {name,description,location,email} = req.body 
    const newGroup = new Group({
        name,
        description,
        location,
    })
    const user = await User.findOne({email:email})
    user.groupName = name;
    await user.save();
    console.log(req.body )
    newGroup.save().then(result=>{
        res.json({newGroup:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/handleLoan',async (req,res)=>{
    try{

    
    const {result,memberName} = req.body
    console.log(req.body) 
    const user = await User.findOne({name:memberName})
    user.loanStatus= result;
    await user.save();
    const loanRequests = await Loanrequest.findOne({memberName:memberName})
    loanRequests.result= result;
    await loanRequests.save();
    await user.save();
    res.json({message:`Loan ${result}`})
    //console.log(req.body )
}
catch (e) {
    console.log('error', e);
} 
   
})


module.exports = router