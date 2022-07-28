const express = require('express');
const {reactPost  } = require('../controllers/react');
const { authUser } = require('../middlewares/auth');
const router = express.Router();

router.put('/reactPost',authUser,reactPost)

// router.post('/auth',authUser, auth);
module.exports = router;
