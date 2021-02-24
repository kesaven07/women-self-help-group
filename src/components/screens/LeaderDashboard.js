import React,{useState,useContext,useEffect, useReducer} from 'react'
import CreateGroupModal from './CreateGroupModal';
import LoanRequestsModal from './LoanRequestsModal';
import {
	Button,
} from 'reactstrap';

const LeaderDashboard  = ()=>{
	const [showCreateGroup, setShowCreateGroup] = useState(false);
	const [showloanRequests, setShowloanRequests] = useState(false);
	const [user, setUser]  = useState({});

	const toggleCreateGroup = () => {
		setShowCreateGroup(!showCreateGroup);
	};

	const loanRequests= () => {
		setShowloanRequests(!showloanRequests);
	};

	const groupCreate = () => {
		return (
			<CreateGroupModal
				show={showCreateGroup}
				toggleCreateGroup={toggleCreateGroup}
				email={user.email}

			/>
		);
	};

	const allLoanRequests = () => {
		return (
			<LoanRequestsModal
				show={showloanRequests}
				loanRequests={loanRequests}
				email={user.email}

			/>
		);
	};
	useEffect(()=>{
		setUser(JSON.parse(localStorage.getItem("user")))
	 },[])
		return (
			<>
				 {groupCreate()} 
				 {allLoanRequests()}
				<Button color="primary" onClick={toggleCreateGroup}>
						Create Group
					</Button>
					<Button color="primary" onClick={loanRequests}>
						Loan Requests
					</Button>
			</>
		);
	
}
export default LeaderDashboard
