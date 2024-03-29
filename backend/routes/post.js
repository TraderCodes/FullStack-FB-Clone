const express = require('express');
const { createPost, getAllPosts, comment ,deletePost} = require('../controllers/post');
const { authUser } = require('../middlewares/auth');
const router = express.Router();

router.post('/createPost', authUser, createPost);

router.get('/getAllPosts', authUser, getAllPosts);
router.put('/comment', authUser, comment);
router.delete('/deletePost/:id', authUser, deletePost);
// router.put('/savePost:/id', authUser, savePost);

// router.post('/auth',authUser, auth);
module.exports = router;
