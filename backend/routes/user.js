const express = require('express');
const {
  register,
  activateAccount,
  login,
  auth,
  sendVerification,
  updateProfilePicture,
  findUser,
  sendResetPasswordCode,
  validateResetCode,
  updateCover,
  changePassword,
  updateDetails,
  getProfile,
} = require('../controllers/user');
const { authUser } = require('../middlewares/auth');
const router = express.Router();

router.post('/register', register);
router.post('/activate', authUser, activateAccount);
router.post('/login', login);
router.post('/sendVerification', authUser, sendVerification);
router.post('/findUser', findUser);
router.post('/sendResetPasswordCode', sendResetPasswordCode);
router.post('/validateResetCode', validateResetCode);
router.post('/changePassword', changePassword);
router.get('/getProfile/:username', authUser, getProfile);
// update user profile
router.put('/updateProfilePicture', authUser, updateProfilePicture);
router.put('/updateCover', authUser, updateCover);
router.put('/updateDetails', authUser, updateDetails);
// router.post('/auth',authUser, auth);
module.exports = router;
