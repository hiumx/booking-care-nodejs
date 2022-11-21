const express = require('express');
const router = express.Router();

const apiController = require('../controllers/UserController');

router.post('/login', apiController.handleLogin)
router.get('/users', apiController.handleGetUsers)

module.exports = router;