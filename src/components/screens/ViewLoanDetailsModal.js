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

    const [isGroupJoined, setIsGroupJoined] = useState(false);
	const [haveTaken, setHaveTaken] = useState(false);
	const [loanStatus, setLoanStatus] = useState("");
	const [loanAmount, setLoanAmount] = useState(0);
   
     

	 useEffect(()=>{
		const userEmail = props.email;
		fetch(`/isGroupJoined/${userEmail}`
        ).then(res=>res.json())
		.then(data=>{
            console.log('checking fun',data)
			setIsGroupJoined(data.groupJoined)
			setHaveTaken(data.haveTaken)
			setLoanStatus(data.loanStatus)
				 
		})
	 },[props])
	 
	 useEffect(()=>{
		const userEmail = props.email;
		fetch(`/loanAmount/${userEmail}`
        ).then(res=>res.json())
		.then(data=>{
            //console.log('checking fun',data)
			//setIsGroupJoined(data.groupJoined)
			//setHaveTaken(data.haveTaken)
			setLoanAmount(data.dueAmount)
				 
		})
     },[props])
	 
     
	 console.log(haveTaken,'hav-taken :')
	 console.log(isGroupJoined,'is gruop joined :')

	const requestLoan = () =>{
        const userName = props.name;
        //const groupName = user.groupName;
        //console.log("bro999",user)
		fetch("/requestLoan",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                userName,
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log("dat after loan",data)
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
			   M.toast({html:"Loan Request Sent",classes:"#43a047 green darken-1"})  
			   setHaveTaken(true)
			   //props.updateState(data.members)
           }
        }).catch(err=>{
            console.log(err)
        })
    }
	return (
		<>
			<Modal isOpen={props.show} toggle={props.toggleViewLoanDetails}>
				<ModalHeader>Loan Details</ModalHeader>
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
                                    {
                                        isGroupJoined ?
                                    
								<div className="home">
                                                        {
                                                         haveTaken?
                                                         <>
														 <h5 style={{color:"yellow"}}>{loanStatus}</h5>
														 </>
                                                         :
                                                            <button style={{
																margin:"10px"
															}} className="btn waves-effect waves-light #64b5f6 blue darken-1"
															onClick={()=>requestLoan()}
															>
																Request Loan
															</button>
                                                
                                                            
                                                            
														}
                                    <h4>Total Amount: 1 Lakh</h4>
                                    <h5>Month Duration: 10 Months</h5>
									<h5>Due Amount: {loanAmount}</h5>
								 </div> 
								 : ""
}
								</Col>
							</Col>
							<Col lg="5"  />
						</Row>
					</>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={props.toggleViewLoanDetails}>
						Close
					</Button>
					{/* <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '} */}
				</ModalFooter>
			</Modal>
		</>
	);
};

export default CreateGroupModal;
