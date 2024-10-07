import EmployeeTraining from '../models/EmployeeTraining.model.js';

export const GetAllEmployeeTrainings = async (req, res) => {
  try {
    const trainings = await EmployeeTraining.find().populate('employee_id').populate('course_id');
    res.json(trainings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const CreateEmployeeTraining = async (req, res) => {
  const employeeTraining = new EmployeeTraining(req.body);
  try {
    const newTraining = await employeeTraining.save();
    res.status(201).json(newTraining);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Additional methods: updateEmployeeTraining, deleteEmployeeTraining, etc.
