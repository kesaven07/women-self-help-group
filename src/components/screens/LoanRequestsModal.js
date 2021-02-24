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

   
    const [loanRequests, setLoanRequests] = useState([]);
   
	
   
      
	 useEffect(()=>{
		const userEmail = props.email;
		fetch(`/loanRequests/${userEmail}`
        ).then(res=>res.json())
		.then(data=>{
			setLoanRequests(data.loanRequests)
				 
		})
     },[props])
	 
     
	

	const handleLoan = (result,memberName) =>{
        
		fetch("/handleLoan",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                result,
                memberName
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log("impppppp",data)
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
			   M.toast({html:data.message,classes:"#43a047 green darken-1"})  
               props.loanRequests();
			   //props.updateState(data.members)
           }
        }).catch(err=>{
            console.log(err)
        })
    }
	return (
		<>
			<Modal isOpen={props.show} toggle={props.loanRequests}>
				<ModalHeader>Loan Requests</ModalHeader>
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
                                   <div >
								{
                                    loanRequests.length > 0 ?

									loanRequests.map((loanRequest) => (
											<div  >
												 <h4 style={{padding:"5px"}}>
												
													Applied By:{loanRequest.memberName}
												 </h4>
                                                 <Button style={{margin:"5px"}} onClick={() =>handleLoan("Approved",loanRequest.memberName)} color ="success">Approved</Button>
                                                 <Button onClick={() => handleLoan("Rejected",loanRequest.memberName)} color="danger">Rejected</Button>
                                                 </div> 
                                        ))
                                        : ""

									
								}
								 </div> 
								</Col>
							</Col>
							<Col lg="5"  />
						</Row>
					</>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={props.loanRequests}>
						Close
					</Button>
					{/* <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '} */}
				</ModalFooter>
			</Modal>
		</>
	);
};

export default CreateGroupModal;
