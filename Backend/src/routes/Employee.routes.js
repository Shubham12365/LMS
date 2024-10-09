import express from "express";

const router = express.Router();
import {GetAllEmployees , EmployeeLogin,CreateEmployee, GetAllEmployeesById } from "../controllers/Employee.controllers.js"





router.get('/', GetAllEmployees);
router.get('/this/', GetAllEmployeesById);
router.post('/', CreateEmployee);
router.post('/login', EmployeeLogin);
// Add routes for update and delete

export default router;

