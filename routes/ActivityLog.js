const express = require('express');
const { ActivityLog} = require('../src/controllers/ActivityLogCtrl');
const router = express.Router();

router.get('/activitylog', ActivityLog);

module.exports = router;