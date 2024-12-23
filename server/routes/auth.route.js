import express from 'express';
import { signup } from '../controllers/auth.controller.js'; // Corrected relative path

const router = express.Router();

router.post("/signup", signup);

export default router;