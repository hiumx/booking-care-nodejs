import express from 'express';
const router = express.Router();
import patientController from '../controllers/PatientController';

router.post('/booking', patientController.bookingSchedule);

export default router;