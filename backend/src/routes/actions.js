import { Router } from 'express';
import { registerForEvent, markAttendance, submitFeedback } from '../controllers/actionsController.js';
const router = Router();
router.post('/register', registerForEvent);
router.post('/attendance', markAttendance);
router.post('/feedback', submitFeedback);
export default router;
