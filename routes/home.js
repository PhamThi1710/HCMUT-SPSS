const express = require('express');
const { home } = require('../src/controllers/homeCtrl');
const router = express.Router();

router.get('/', home);

module.exports = router;