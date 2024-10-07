import express from "express";
const router = express.Router();
import {GetAllEmployeeTrainings, CreateEmployeeTraining} from '../controllers/EmployeeTraining.controllers.js';

router.get('/', GetAllEmployeeTrainings);
router.post('/', CreateEmployeeTraining);
// Add routes for update and delete
export default router;
