import Employee from "../models/Employee.model.js";

export const GetAllEmployees = async (req, res) => {
	

	try {
		const employees = await Employee.find();
		res.status(200).json(employees);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const GetAllEmployeesById = async (req, res) => {
    const { employeeID } = req.params; 
	// console.log(employeeID);
	
    try {
        const employee = await Employee.findById(employeeID); // Use Employee model to find by ID
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" }); // Change message to reflect employee
        }
        res.status(200).json(employee); // Return the employee object
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const CreateEmployee = async (req, res) => {
	const { name, email, password, phone_num , designation, hire_date } =
		req.body;
  
	try {
		const newEmployee = new Employee({
			name,
			email,
			password, 
			phone_num,
			designation,
			hire_date,
			
		});

		const savedEmployee = await newEmployee.save();
		console.log("saved", savedEmployee);
		res.status(201).json(savedEmployee);
	} catch (err) {
		console.error("Error creating employee:", err);
		res.status(400).json({ message: err.message, details: err.errors });
	}
};

// Additional methods: updateEmployee, deleteEmployee, etc.
