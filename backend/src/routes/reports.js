import { Router } from 'express';
import { eventPopularity, studentParticipation, topStudents, eventMetrics } from '../controllers/reportsController.js';
const router = Router();
router.get('/event-popularity', eventPopularity);
router.get('/student-participation', studentParticipation);
router.get('/top-students', topStudents);
router.get('/event-metrics/:eventId', eventMetrics);
export default router;
