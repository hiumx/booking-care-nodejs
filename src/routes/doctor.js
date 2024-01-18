const express = require('express');
const router = express.Router()

const doctorController = require('../controllers/DoctorController');

router.get('/top-doctor-home', doctorController.getTopDoctorHome);
router.get('/get-all-doctor', doctorController.getAllDoctor);
router.post('/save-detail-doctor', doctorController.saveDetailDoctor);
router.put('/save-detail-doctor', doctorController.updateDetailDoctor);
router.get('/info-doctor', doctorController.getInfoDoctorById);
router.post('/doctor-schedule', doctorController.createDoctorSchedule);
router.get('/doctor-schedule', doctorController.getScheduleDoctorByDate);

module.exports = router