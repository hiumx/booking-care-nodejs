const express = require('express');
const router = express.Router();

const apiController = require('../controllers/UserController');
import * as markdownController from '../controllers/MarkdownController';

router.post('/login', apiController.handleLogin)
router.get('/users', apiController.handleGetUsers)
router.post('/users/create', apiController.createNewUser)
router.put('/users/edit', apiController.editUser)
router.delete('/users/delete', apiController.deleteUser)

router.get('/allcode', apiController.handleGetAllCode);
router.get('/doctor-clinic/:id', apiController.getInfoClinicDoctor);
router.get('/doctor-clinic-detail/:id', apiController.getClinicDoctorDetail);

router.get('/info-doctor-markdown/:id', markdownController.getInfoDoctorMarkDown);
router.get('/schedule-time-detail', apiController.getInfoTimeDetailById);

router.get('/doctor-schedule', apiController.getDoctorSchedule);


module.exports = router;