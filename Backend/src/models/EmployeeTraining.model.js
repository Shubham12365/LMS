import mongoose from "mongoose";


const employeeTrainingSchema = new mongoose.Schema({
  employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  enrollment_date: { type: Date, default: Date.now },
  completion_date: Date,
  score: Number,
});

export default mongoose.model('EmployeeTraining', employeeTrainingSchema);
