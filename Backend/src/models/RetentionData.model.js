import mongoose from "mongoose";

const retentionDataSchema = new mongoose.Schema({
  employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  date: { type: Date, default: Date.now },
  reason: { type: String },
  feedback: { type: String },
  retention: { type: Boolean, default: true } // Added retention field with a default value of true
});

export default mongoose.model('RetentionData', retentionDataSchema);
