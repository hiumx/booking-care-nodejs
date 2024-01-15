const express = require('express');
const router = express.Router();

const apiController = require('../controllers/UserController');
import * as markdownController from '../controllers/MarkdownController';

router.post('/login', apiController.handleLogin)
router.get('/users', apiController.handleGetUsers)
router.post('/users/create', apiController.createNewUser)
router.put('/users/edit', apiController.editUser)
router.delete('/users/delete', apiController.deleteUser)

router.get('/allcode', apiController.handleGetAllCode)

router.get('/get-info-doctor/:id', markdownController.getInfoFromDoctorId);


module.exports = router;