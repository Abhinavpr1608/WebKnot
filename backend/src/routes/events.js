import { Router } from 'express';
import { createEvent, listEvents } from '../controllers/eventsController.js';
const router = Router();
router.post('/', createEvent);
router.get('/', listEvents);
export default router;
