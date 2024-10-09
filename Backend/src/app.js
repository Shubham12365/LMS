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


import Employee from "./models/Employee.model.js";


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

app.post('/login' ,  async (req, res) => {
    const { email, password } = req.body;

    // Step 1: Validations
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    
    try {
        // Step 2: Get user
        const emp = await Employee.findOne({ email });
        
        // Step 3: Check if user exists
        if (!emp) {
            return res.status(404).json({ message: 'User not found.' });
        }
        
        // Step 4: Check password
        const isMatch = await bcrypt.compare(password, emp.password);

        console.log('Password Match:', isMatch);
        if (!isMatch) {
            console.log("Hell o ");
            return res.status(401).json({ message: 'Invalid password.' });
        }

        // Step 5: Generate token
        const token = jwt.sign(
            { id: emp._id, email: emp.email }, // Payload
            process.env.JWT_SECRET, // Secret key (ensure you have this in your environment variables)
            { expiresIn: '1h' } // Token expiry time
        );

        // Step 6: Inject token into cookies
        res.cookie('token', token, {
            httpOnly: true, // Helps mitigate XSS attacks
            secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
            maxAge: 3600000 // Cookie expiry time (1 hour)
        });

        // Step 7: Send response
        return res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error("Error during login:", err);
        return res.status(500).json({ message: 'Server error' });
    }
}
);


export  {app };