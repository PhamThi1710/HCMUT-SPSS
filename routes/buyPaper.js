const express = require('express');
const { buyPaper } = require('../src/controllers/buyPaperCtrl');
const router = express.Router();

router.get('/buy-pages', buyPaper);

module.exports = router;