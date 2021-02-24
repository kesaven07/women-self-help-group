import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	FormGroup,
	Label,
	Input,
} from 'reactstrap';
const SignIn  = ()=>{
    const history = useHistory()
    const [name,setName] = useState("")
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    const [userType, setUserType] = useState("")
    
   
    const uploadFields = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
                userType
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(111111111,data)
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
                //localStorage.setItem("user",JSON.stringify(data.user))
               M.toast({html:data.message,classes:"#43a047 green darken-1"})
               history.push("/signin")
               
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    const PostData = ()=>{

            uploadFields()
        
       
    }

   return (
      <div className="mycard">
          <div className="card auth-card input-field">
            <h2>Women Self Help Group</h2>
            <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />
            <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=>setPasword(e.target.value)}
            />
            <FormGroup>
					{/* <Label>Select Your Role</Label> */}
					<Input
						value={userType}
						onChange={(e) => setUserType(e.target.value)}
                        type="text"
                        placeholder="Select Your Role"
						list="hosts"
						name="host"
					/>
					<datalist id="hosts">
						<option>Member</option>
						<option>Leader</option>
					</datalist>
				</FormGroup>
            
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={()=>PostData()}
            >
                SignUP
            </button>
            <h5>
                <Link to="/signin">Already have an account ?</Link>
            </h5>
             
               
         
            
    
        </div>
      </div>
   )
}


export default SignIn