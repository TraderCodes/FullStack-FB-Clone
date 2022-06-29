const express = require('express');
const { uploadImages } = require('../controllers/upload');
const { authUser } = require('../middlewares/auth');
const imageUpload = require('../middlewares/imageUpload');
const router = express.Router();

// add middleware to validate image before upload to backend
router.post('/uploadImages', imageUpload, uploadImages);
// router.post('/auth',authUser, auth);
module.exports = router;
