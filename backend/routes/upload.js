const express = require('express');
const { uploadImages, listImages } = require('../controllers/upload');
const { authUser } = require('../middlewares/auth');
const imageUpload = require('../middlewares/imageUpload');
const router = express.Router();

// add middleware to validate image before upload to backend
router.post('/uploadImages', authUser, imageUpload, uploadImages);
router.get('/listImages', listImages);
// router.post('/auth',authUser, auth);
module.exports = router;
