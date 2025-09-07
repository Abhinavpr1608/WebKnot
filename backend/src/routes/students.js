import { Router } from 'express';
import { registerStudent, loginStudent } from '../controllers/studentsController.js';
const router = Router();
router.post('/register', registerStudent);
router.post('/login', loginStudent);
export default router;
