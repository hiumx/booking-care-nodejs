import express from 'express';
const router = express.Router();
import patientController from '../controllers/PatientController';

router.post('/booking', patientController.bookingSchedule);
router.post('/verify-schedule', patientController.verifySchedule);

export default router;