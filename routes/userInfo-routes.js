const express = require('express');
const router = express.Router();
const { getUserInfo } = require('../src/controllers/userInfoCtrl');

router.get('/user-info', getUserInfo);

module.exports = router;
