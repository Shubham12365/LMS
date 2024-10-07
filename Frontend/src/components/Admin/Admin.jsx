import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Employees from "./Employee"; 
import Trainers from "./Trainer";
import Courses from "./Course";

function Admin() {
	const [activeComponent, setActiveComponent] = useState("Dashboard");

	
	const handleSelectComponent = (componentName) => {
		setActiveComponent(componentName); 
	};

	return (
		<div className="flex">
			<Sidebar onSelectComponent={handleSelectComponent} />

			<div className="content h-screen w-full">
				
				{activeComponent === "Dashboard" && <Dashboard />}
				{activeComponent === "Employees" && <Employees />}
				{activeComponent === "Trainers" && <Trainers />}
				{activeComponent === "Courses" && <Courses />}
			</div>
		</div>
	);
}

export default Admin;
