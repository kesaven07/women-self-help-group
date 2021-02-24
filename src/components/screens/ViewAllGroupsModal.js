import React, { Fragment, useState, useEffect } from 'react';
import {
	Col,
	Row,
	Form,
	FormGroup,
	Button,
	Label,
	Input,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from 'reactstrap';
import M from 'materialize-css'

const CreateGroupModal = (props) => {
	const [allGroups, setAllGroups] = useState([]);
	const [isGroupJoined, setIsGroupJoined] = useState(false);
	const [user, setUser]  = useState({});

    useEffect(()=>{
		fetch('/allGroups').then(res=>res.json())
		.then(result=>{
			setAllGroups(result.allGroups)
			 
		})
		
	 },[isGroupJoined])

	 useEffect(()=>{
		const userEmail = props.email;
		fetch(`/isGroupJoined/${userEmail}`
        ).then(res=>res.json())
		.then(data=>{
            console.log('yoooo',data)
			setIsGroupJoined(data.groupJoined)
			
				 
		})
     },[props])

	 const joinGroup = (groupName) =>{
		 const userEmail = props.email;
		 console.log(userEmail, groupName)
		fetch("/joinGroup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                userEmail,
                groupName,
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(1112343411111111,data)
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
			   M.toast({html:data.message,classes:"#43a047 green darken-1"})  
			   setIsGroupJoined(true)
			   props.updateState(data.members)
           }
        }).catch(err=>{
            console.log(err)
        })
	 }
console.log("#43a047 green darken-1",isGroupJoined)
	return (
		<>
			<Modal isOpen={props.show} toggle={props.toggleViewAllGroups}>
				<ModalHeader>All Groups</ModalHeader>
				<ModalBody>
					<>
						<Row className="">
							<Col lg="12" xs="12" md="12" className="">
								<Col
									lg="9"
									md="10"
									sm="12"
									//lassName="mx-auto app-login-box"
								>
								<div className="home">
								{
									allGroups.map((group) => (
											<div className="card home-card" >
												 <h4 style={{padding:"5px"}}>
												
													{group.name}
												 </h4>
												 {/* <div className="card-image"> */}
													 {/* <img src={item.photo}/> */}
												 {/* </div> */}
												 <div style={{marginTop:"-20px"}}className="card-content">
												 
												
													 <h6>{group.description}</h6>
													 <h5>{group.location}</h5>
													 	{
														 isGroupJoined?
														 ""
														 :
															<button style={{
																margin:"10px"
															}} className="btn waves-effect waves-light #64b5f6 blue darken-1"
															onClick={()=>joinGroup(group.name)}
															>
																Join
															</button>
														}
													 </div> 
											 </div> 
										))
									
								}
								 </div> 
								</Col>
							</Col>
							<Col lg="5"  />
						</Row>
					</>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={props.toggleViewAllGroups}>
						Close
					</Button>
					{/* <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '} */}
				</ModalFooter>
			</Modal>
		</>
	);
};

export default CreateGroupModal;
