import express from "express";
import cors from "cors";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { CORS_ORIGIN } from "./config/index.js";

const app = express();


app.use(
    cors({
        origin:CORS_ORIGIN,
        credentitals : true,
    })
)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Import Routes
import CourseRoutes from "./routes/Course.routes.js"
import EmployeeRoutes from "./routes/Employee.routes.js"
import EmployeeTrainingRoutes from "./routes/EmployeeTraining.routes.js"
import PerformanceMetricRoutes from "./routes/PerformanceMetric.routes.js"
import RetentionDataRoutes from "./routes/RetentionData.routes.js"
import TrainerRoutes from "./routes/Trainer.routes.js"
import TrainingProgramRoutes from "./routes/TrainingProgram.routes.js"



//Routes
app.use("/api/v1/CourseRoutes" , CourseRoutes);
app.use("/api/v1/EmployeeRoutes" , EmployeeRoutes);
app.use("/api/v1/EmployeeTrainingRoutes" , EmployeeTrainingRoutes);
app.use("/api/v1/PerformanceMetricRoutes" , PerformanceMetricRoutes);
app.use("/api/v1/RetentionDataRoutes" , RetentionDataRoutes);
app.use("/api/v1/TrainerRoutes" , TrainerRoutes);
app.use("/api/v1/TrainingProgramRoutes" , TrainingProgramRoutes);

const JWT_SECRET = process.env.JWT_SECRET || 'Shubham';

const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
        expiresIn: '1h',
    });
};


app.post('/login',  async (req, res) => {
    console.log("fsskldjf")
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        let user = await TrainerRoutes.findOne({ email });
      

        if (!user) {
            return res.status(404).json({ error: 'Trainer not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(user);

        res.json({
            message: 'Login successful',
            token,
            role: user.role,
            userId: user._id,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


export  {app };