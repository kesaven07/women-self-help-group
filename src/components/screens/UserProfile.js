import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'
const Profile  = ()=>{
    const [userProfile,setProfile] = useState({})
    
    const {state,dispatch} = useContext(UserContext)
    const {userid} = useParams()
    //const [showfollow,setShowFollow] = useState(state?!state.following.includes(userid):true)
    useEffect(()=>{
       fetch(`/user/${userid}`,{
       }).then(res=>res.json())
       .then(result=>{
           console.log(111111212121,result)
         
            setProfile(result.user)
       })
    },[])
    console.log(userProfile.haveTakenLoan,3333)


    
   return (
       <>
       {userProfile ?
       <div style={{maxWidth:"550px",margin:"0px auto"}}>
           
               <div>
                   {/* <img style={{width:"160px",height:"160px",borderRadius:"80px"}} */}
                   {/* src={userProfile.user.pic} */}
                   {/* /> */}
               </div>
               <div>
                   <h4>Name :{userProfile ? userProfile.name:""}</h4>
                   <h5>Email :{userProfile ?userProfile.email:""}</h5> 
                   <h5>GroupName :{userProfile ?userProfile.groupName:""}</h5>
                   {/* <h6>Loan Taken:{userProfile ?userProfile.haveTakenLoan:"777"}</h6> */}
                   {/* <h6>Group Joined:{userProfile ? userProfile.groupJoined:"77"}</h6> */}
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                      
                   </div>
                  
               </div>
           
     
          
       </div>
       
       
       : <h2>loading...!</h2>}
       
       </>
   )
}


export default Profile