import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUsers, FaBook, FaChalkboardTeacher } from 'react-icons/fa'; // Importing icons

function Dashboard() {

	const [performanceData, setPerformanceData] = useState([]); 
  const [totalEmp, setTotalEmployee] = useState(0);
	const [totalCourse, setTotalCourse] = useState(0);
	const [totalTrainer, setTotalTrainers] = useState(0);
  const [filter, setFilter] = useState('all'); // State for the filter

  // Static employee data with more fields
  const employees = [
    {
      empId: 'EMP001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      department: 'Engineering',
      team: 'Frontend',
      designation: 'Software Engineer',
      activeStatus: 'Active',
    },
    {
      empId: 'EMP002',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      department: 'HR',
      team: 'Recruitment',
      designation: 'HR Manager',
      activeStatus: 'Inactive',
    },
    {
      empId: 'EMP003',
      name: 'Sam Green',
      email: 'sam.green@example.com',
      department: 'Engineering',
      team: 'Backend',
      designation: 'Senior Software Engineer',
      activeStatus: 'Active',
    },
    {
      empId: 'EMP004',
      name: 'Emily White',
      email: 'emily.white@example.com',
      department: 'HR',
      team: 'Training',
      designation: 'HR Coordinator',
      activeStatus: 'Inactive',
    },
    {
      empId: 'EMP005',
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      department: 'Engineering',
      team: 'DevOps',
      designation: 'DevOps Engineer',
      activeStatus: 'Active',
    },
  ];

  // Handle filter change
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Filter employees based on the selected filter
  const filteredEmployees = employees.filter((employee) => {
    if (filter === 'all') return true;
    if (filter === 'active') return employee.activeStatus === 'Active';
    if (filter === 'inactive') return employee.activeStatus === 'Inactive';
    if (filter === 'hr') return employee.department === 'HR';
    if (filter === 'engineering') return employee.department === 'Engineering';
    return true;
  });

  // Total Employees, Courses, and Trainers - static values for demonstration
  const totalEmployees = employees.length;
  const totalCourses = 15; // Placeholder value for courses
  const totalTrainers = 5; // Placeholder value for trainers

  const performanceMetricValues = async () => {
	try {
	  // Fetch data from API
	  const response = await axios.get("http://localhost:4000/api/v1/PerformanceMetricRoutes/this");
  
	  console.log("API Response:", response.data); // Log the response structure
  
	  // If response.data is an object, extract the values into an array
	  const data = Array.isArray(response.data) ? response.data : Object.values(response.data);
  
	  // Log the data before sorting to check its structure
	  console.log("Data before sorting:", data);
  
	  // Check if data is empty
	  if (!data.length) {
		console.warn("No data to sort.");
		return;
	  }
	  
	  console.log("Data " , data[0][0].quiz_score)
	  // Ensure quiz_score is treated as a number and sort by quiz_score in descending order
	  const sortedByQuizScore= data[0].sort((a, b) => b.quiz_score - a.quiz_score);
  
	  // Log the sorted data
	  console.log("Sorted by Quiz Score (Descending):", sortedByQuizScore);
  
	  // Set sorted data into state
	  setPerformanceData(sortedByQuizScore);
	  
	} catch (err) {
	  console.error("Error fetching performance metrics:", err); // Log error details
	}
  };
  
  
    const fetchEmployees = async () => {
			try {
				const responseEmp = await axios.get(
					"http://localhost:4000/api/v1/EmployeeRoutes"
				);
				const responseTrainer = await axios.get(
					"http://localhost:4000/api/v1/TrainerRoutes"
				);
				const responseCourse = await axios.get(
					"http://localhost:4000/api/v1/CourseRoutes"
				);

				if (responseEmp.data && Array.isArray(responseEmp.data)) {
			
					setTotalEmployee(responseEmp.data.length);
				}
				if (responseTrainer.data && Array.isArray(responseTrainer.data)) {
					setTotalTrainers(responseTrainer.data.length);
				}
				if (responseCourse.data && Array.isArray(responseCourse.data)) {
					setTotalCourse(responseCourse.data.length);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
				setTotalEmployee(0);
				setTotalCourse(0);
				setTotalTrainers(0);
			}
		};

    useEffect(() => {
      fetchEmployees();
      performanceMetricValues();
  }, []);


  return (
    <div className="w-full h-full ">
      <div className="m-4 flex justify-between">
        <div className="font-semibold text-3xl">Dashboard</div>
        <div className="flex items-center">
          {/* Filter Dropdown */}
          <select
            value={filter}
            onChange={handleFilterChange}
            className="mr-2 w-44 p-2 text-sm border border-gray-300 rounded-lg bg-gray-50"
          >
            <option value="all">All Employees</option>
            <option value="quiz">Quiz Score</option>
            <option value="puctuality">Punctuality</option>
            <option value="discipline">Discipline</option>
            <option value="communication">Communication</option>
            <option value="teamwork">Team Work</option>
            <option value="problem_solving">Problem Solving</option>
          </select>

          {/* Search Bar */}
          <input
            type="search"
            id="default-search"
            className="mr-2 w-64 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
            placeholder="Search for Employee"
            required
          />

          {/* Add Employee Button */}
          <button className="h-10 w-44 ml-1 bg-blue-600 text-white rounded-2xl">
            +Add Employee
          </button>
        </div>
      </div>

      <div className="mt-8 mr-8 h-full max-h-full rounded-3xl bg-blue-100">
        <div className="m-4 p-2 pt-8 flex justify-between rounded-3xl h-2/6">
          <div className="border-2 bg-white border-gray-200 rounded-3xl w-1/3 p-6 flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold">Total Employees</h4>
              <p className="text-3xl font-bold">{totalEmp}</p>
            </div>
            <FaUsers className="text-4xl text-blue-500" /> {/* Total Employees Icon */}
          </div>
          <div className="ml-6 border-2 bg-white border-gray-200 rounded-3xl w-1/3 p-6 flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold">Total Courses</h4>
              <p className="text-3xl font-bold">{totalCourse}</p>
            </div>
            <FaBook className="text-4xl text-green-500" /> {/* Total Courses Icon */}
          </div>
          <div className="ml-6 border-2 bg-white border-gray-200 rounded-3xl w-1/3 p-6 flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold">Total Trainers</h4>
              <p className="text-3xl font-bold">{totalTrainer}</p>
            </div>
            <FaChalkboardTeacher className="text-4xl text-purple-500" /> {/* Total Trainers Icon */}
          </div>
        </div>

        <div className="flex h-3/6 w-full">
          <div className="m-5 mt-1 border-2 border-gray-200 bg-white rounded-3xl w-4/6 h-full">
            <h3 className="text-lg font-semibold p-4">Employee List</h3>
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Employee ID</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Department</th>
                  <th className="border px-4 py-2">Team</th>
                  <th className="border px-4 py-2">Designation</th>
                  <th className="border px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => (
                    <tr key={employee.empId}>
                      <td className="border px-4 py-2">{employee.empId}</td>
                      <td className="border px-4 py-2">{employee.name}</td>
                      <td className="border px-4 py-2">{employee.email}</td>
                      <td className="border px-4 py-2">{employee.department}</td>
                      <td className="border px-4 py-2">{employee.team}</td>
                      <td className="border px-4 py-2">{employee.designation}</td>
                      <td className="border px-4 py-2">{employee.activeStatus}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="border px-4 py-2 text-center text-red-500">
                      No employees found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="m-5 mt-1 border-2 border-gray-200 bg-white rounded-3xl w-2/6 h-full">
            Employee View
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
