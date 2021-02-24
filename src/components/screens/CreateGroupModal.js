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
	const [name, setName] = useState('');
    const [description, setdescription] = useState('');
    const [location, setLocation] = useState('');
    
	
    const clearForm = () =>{
        setName('');
        setdescription('');
        setLocation('');
    }
	const addGroup = () => {
        if(!name || !description || !location ){
            M.toast({html: "please fill all the fields",classes:"#c62828 red darken-3"})
            return
        }
        fetch("/newGroup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                description,
				location,
				email:props.email
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(1112343411111111,data)
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               M.toast({html:"Group created Successfully",classes:"#43a047 green darken-1"})
               props.toggleCreateGroup(); 
               clearForm();   
           }
        }).catch(err=>{
            console.log(err)
        })
	}

	

	return (
		<>
			<Modal isOpen={props.show} toggle={props.toggleCreateGroup}>
				<ModalHeader>Create Group</ModalHeader>
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
									
									<div>
										<Form>
											<div>
												<FormGroup>
													<Label for="name">Name</Label>
													<Input
														type="text"
														placeholder="Name your Group"
														name="name"
														id="name"
														value={name}
														onChange={(e) =>
															setName(e.target.value)
														}
													/>
												</FormGroup>

												<FormGroup>
													<Label for="description">
														Description
													</Label>
													<Input
														type="text"
														placeholder="Add short description"
														name="text"
														id="description"
														value={description}
														onChange={(e) =>
															setdescription(
																e.target.value,
															)
														}
													/>
												</FormGroup>
                                                <FormGroup>
													<Label for="location">
														Location
													</Label>
													<Input
														type="text"
														placeholder="Add location"
														name="text"
														id="location"
														value={location}
														onChange={(e) =>
															setLocation(
																e.target.value,
															)
														}
													/>
												</FormGroup>

												
											
                                                <Button
														color="primary"
														onClick={addGroup}
													>
														Add
													</Button>
												
											</div>
										</Form>
									</div>
								</Col>
							</Col>
							<Col lg="5"  />
						</Row>
					</>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={props.toggleCreateGroup}>
						Cancel
					</Button>
					{/* <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '} */}
				</ModalFooter>
			</Modal>
		</>
	);
};

export default CreateGroupModal;
