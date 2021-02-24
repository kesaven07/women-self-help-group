import React,{useState,useEffect,useContext,} from 'react'

import {
	Button,
} from 'reactstrap';
import ViewAllGroupsModal from './ViewAllGroupsModal';
import ViewMembersListModal from './ViewMembersListModal';
import ViewLoanDetailsModal from './ViewLoanDetailsModal';



const MemberDashboard  = ()=>{
	const [showViewAllGroups, setShowViewAllGroups] = useState(false);
	const [showViewMembersList, setShowViewMembersList] = useState(false);
	const [showViewLoanDetails, setShowViewLoanDetails] = useState(false);
	const [allMembers, setAllMembers] = useState([]);
	const [user, setUser]  = useState({});
 
	const toggleViewAllGroups = () => {
		setShowViewAllGroups(!showViewAllGroups);
	};

	const toggleViewMembersList = () => {
		setShowViewMembersList(!showViewMembersList);
	};

	const toggleViewLoanDetails = () => {
		setShowViewLoanDetails(!showViewLoanDetails);
	};

	const updateState = (members) =>{
		setAllMembers(members)
	}
	
	useEffect(()=>{
		setUser(JSON.parse(localStorage.getItem("user")))
	 },[])
	 
	 
	 

	const viewAllGroups = () => {
		return (
			<ViewAllGroupsModal
				show={showViewAllGroups}
				toggleViewAllGroups={toggleViewAllGroups}
				updateState={updateState}
				email={user.email}
				

			/>
		);
	};

	const viewMembersList = () => {
		return (
			<ViewMembersListModal
				show={showViewMembersList}
				toggleViewMembersList={toggleViewMembersList}
				allMembers={allMembers}
				email={user.email}

			/>
		);
	};

	const viewLoanDetails = () => {
		return (
			<ViewLoanDetailsModal
				show={showViewLoanDetails}
				toggleViewLoanDetails={toggleViewLoanDetails}
				email={user.email}
				name={user.name}

			/>
		);
	};

	

	
		return (
			<> 
				{viewAllGroups()}
				{viewMembersList()}
				{viewLoanDetails ()}
				<Button color="primary" onClick={toggleViewAllGroups}>
						View All Groups
				</Button>
				<Button color="primary" onClick={toggleViewMembersList}>
						Members List
				</Button>
				<Button color="primary" onClick={toggleViewLoanDetails}>
						Loan Details
				</Button>
			</>
		);
	
}
export default MemberDashboard
