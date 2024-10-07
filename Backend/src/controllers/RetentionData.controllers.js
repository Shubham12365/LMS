import RetentionData from '../models/RetentionData.model.js';

export const GetAllRetentionData = async (req, res) => {
  try {
    const retentionData = await RetentionData.find().populate('employee_id');
    res.json(retentionData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const CreateRetentionData = async (req, res) => {
  const retentionData = new RetentionData(req.body);
  try {
    const newRetention = await retentionData.save();
    res.status(201).json(newRetention);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Additional methods: updateRetentionData, deleteRetentionData, etc.
