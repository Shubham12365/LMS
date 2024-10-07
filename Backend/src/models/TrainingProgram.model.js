import mongoose from "mongoose";

const trainingProgramSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  duration: Number,
  creation_date: { type: Date, default: Date.now },
  course_type: { type: String, enum: ['online', 'in-person'] },
 
});

export default  mongoose.model('TrainingProgram', trainingProgramSchema);
