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
	const [allMembers, setAllMembers] = useState([]);
    

      useEffect(()=>{
		const userEmail = props.email;
		fetch(`/allMembersList/${userEmail}`
        ).then(res=>res.json())
		.then(data=>{
            console.log('yoooo',data)
            setAllMembers(data.members)
				 
		})
     },[props])

	
    
	return (
		<>
			<Modal isOpen={props.show} toggle={props.toggleViewMembersList}>
				<ModalHeader>Member List</ModalHeader>
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
                                    allMembers.length > 0 ?

									allMembers.map((member) => (
											<div className="card home-card" >
												 <h4 style={{padding:"5px"}}>
												
													{member}
												 </h4>
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
					<Button color="primary" onClick={props.toggleViewMembersList}>
						Close
					</Button>
					{/* <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '} */}
				</ModalFooter>
			</Modal>
		</>
	);
};

export default CreateGroupModal;
