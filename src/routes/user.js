const express = require('express');
const router = express.Router();

const apiController = require('../controllers/UserController');

router.post('/login', apiController.handleLogin)
router.get('/users', apiController.handleGetUsers)
router.post('/users/create', apiController.createNewUser)
router.put('/users/edit', apiController.editUser)
router.delete('/users/delete', apiController.deleteUser)

module.exports = router;