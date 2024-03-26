const express = require('express');
const { newReq, newPostReq } = require('../src/controllers/newReqCtrl');
const router = express.Router();


const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get('/printing-request', newReq);
// router.post('/printing-request', upload.array("files"), newPostReq);
router.post('/printing-request', newPostReq);

module.exports = router;