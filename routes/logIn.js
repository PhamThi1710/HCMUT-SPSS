const express = require('express');
const { login, verify} = require('../src/controllers/logInCtrl');
const router = express.Router();

router.get('/login', login);
router.post('/login', verify);

module.exports = router;