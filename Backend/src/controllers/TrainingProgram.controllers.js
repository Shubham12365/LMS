import TrainingProgram from '../models/TrainingProgram.model.js';

export const GetAllTrainingPrograms = async (req, res) => {
    try {
    // console.log("hfksdhs");
    const programs = await TrainingProgram.find();
    res.json(programs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const CreateTrainingProgram = async (req, res) => {
  const program = new TrainingProgram(req.body);
  try {
    const newProgram = await program.save();
    res.status(201).json(newProgram);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Additional methods: updateTrainingProgram, deleteTrainingProgram, etc.
