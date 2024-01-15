const express = require('express');
const router = express.Router()

const doctorController = require('../controllers/DoctorController')

router.get('/top-doctor-home', doctorController.getTopDoctorHome)
router.get('/get-all-doctor', doctorController.getAllDoctor)
router.post('/save-detail-doctor', doctorController.saveDetailDoctor)
router.put('/save-detail-doctor', doctorController.updateDetailDoctor)
router.get('/get-info-doctor-by-id', doctorController.getInfoDoctorById)

module.exports = router