const express = require('express');
const router = express.Router();

const apiController = require('../controllers/UserController');

router.post('/login', apiController.handleLogin)

module.exports = router;