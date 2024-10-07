import express from "express";
const router = express.Router();
import {CreateTrainingProgram, GetAllTrainingPrograms} from '../controllers/TrainingProgram.controllers.js';

router.get('/', GetAllTrainingPrograms);
router.post('/', CreateTrainingProgram);
// Add routes for update and delete
export default router;