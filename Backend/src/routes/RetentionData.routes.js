import express from "express";
const router = express.Router();
import {GetAllRetentionData, CreateRetentionData} from '../controllers/RetentionData.controllers.js';

router.get('/', GetAllRetentionData);
router.post('/', CreateRetentionData);
// Add routes for update and delete

export default router;