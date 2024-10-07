import React , {useState} from 'react'
import Sidebar from './Sidebar'
import Dashboard from "../Admin/Dashboard";
import Performance from "./PerformanceMetrics"; 
import Trainers from "../Admin/Trainer";
import Courses from './Courses';

function Trainer() {
  const [activeComponent, setActiveComponent] = useState("Courses");

	
	const handleSelectComponent = (componentName) => {
		setActiveComponent(componentName); 
	};

  return (
    <div className="flex">
    <Sidebar onSelectComponent={handleSelectComponent} />

    <div className="content h-screen w-full">
        
        {activeComponent === "Dashboard" && <Dashboard />}
        {activeComponent === "Employees" && <Performance />}
        {activeComponent === "Trainers" && <Trainers />}
        {activeComponent === "Courses" && <Courses />}
    </div>
</div>
  )
}

export default Trainer
