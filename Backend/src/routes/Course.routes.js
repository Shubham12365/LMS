import express from "express";
const router = express.Router();
// import courseController from "../controllers/Course.controllers.js"
import { CreateCourse } from "../controllers/Course.controllers.js";
import { GetAllCourses } from "../controllers/Course.controllers.js";

router.get('/', GetAllCourses);
router.post('/', CreateCourse);
// Add routes for update and delete

export default router;
