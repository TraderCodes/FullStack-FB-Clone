// import User temp from model
const {
  validateEmail,
  validateLength,
  validateUsername,
} = require('../helpers/validation');
const { generateToken } = require('../helpers/token');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { sendVerificationEmail, sendResetCode } = require('../helpers/mailer');
const { findOne } = require('../models/User');
const Code = require('../models/Code');
const generateCode = require('../helpers/generateCode');
// const { findOneAndUpdate, findOne } = require('../models/User');
// 🔴Register add to routes
exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      username,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body; //get info from user input
    // information to re register to the user

    // if (!validateEmail(email)){
    //   return res.status(400).json({message:'invalid email'})}

    // 🔴 Below Check if database have the same email
    const check = await User.findOne({ email });
    if (check) {
      return res
        .status(400)
        .json({ message: 'The email already exists , sorry' });
    }
    // if is not min 3 max 30
    if (!validateLength(first_name, 3, 30)) {
      return res.json({
        message: 'First name must be 3-30 Letters',
        first: first_name.length,
      });
    }
    if (!validateLength(last_name, 3, 30)) {
      return res.status(400).json({ message: 'Type more please :)' });
    }
    if (!validateLength(password, 3, 30)) {
      return res.status(400).json({ message: 'Needs 3-30 Characters' });
    }
    // return

    // bcrypt the password
    const cryptedPassword = await bcrypt.hash(password, 12);

    let tempUsername = first_name + last_name;
    let newUsername = await validateUsername(tempUsername);
    const user = await new User({
      first_name,
      last_name,
      email,
      password: cryptedPassword,
      username: newUsername, //after checking if validate , the username is now the newusername
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();

    // Generate email
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      '30m'
    );
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    // pass in name,email and url to verification
    sendVerificationEmail(user.email, user.first_name, url);
    // ger
    const token = generateToken({ id: user._id.toString() }, '7d');
    // send user items to the front end
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: 'Activate Email to start , Register Successfully',
    });

    // save and response with the new user
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// 🔴Activate add to routes
exports.activateAccount = async (req, res) => {
  try {
    const validUser = req.user.id;
    const { token } = req.body;
    // reverse the token to id data
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    // console.log(user); // return user id from the
    const check = await User.findById(user.id);

    // This triggers the User model verification to true or face and do something base on if the token exist or not
    if (validUser !== user.id) {
      return res.status(400).json({ message: 'You are not the user' });
    }
    if (check.verified == true) {
      return res
        .status(400)
        .json({ message: 'This user is already activated' });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      return res.status(200).json({ message: 'Successfully activated' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.login = async (req, res) => {
  try {
    // first check if user email is in the User model then check the password by decrypting the password
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'the user does not exist' });
    }
    // decrypting hash compare password which user request to
    // user which is the one that contain the email entered
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(404).json({ message: 'Wrong password,Try again' });
    }
    // when login is success🔴
    const token = generateToken({ id: user._id.toString() }, '7d');
    // send user items to the front end
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      // message: 'Register Successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// 🔴resend user notification
exports.sendVerification = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    if (user.verified === true) {
      return res.status(404).json({ message: 'Already registered' });
    }
    // if it's not verified Creat email
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      '60m'
    );
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    // pass in name,email and url to verification
    sendVerificationEmail(user.email, user.first_name, url);
    return res.status(200).json({ message: 'Email verification link sent' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.findUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).select('-password');
    if (!user) {
      return res.status(400).json({
        message: 'Account does not exists.',
      });
    }
    return res.status(200).json({
      email: user.email,
      picture: user.picture,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.sendResetPasswordCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).select('-password');
    await Code.findOneAndRemove({ user: user._id });
    // generate code
    const code = generateCode(5);
    // everytime when request is made we generate new code below and save to database
    const savedCode = await new Code({
      code,
      user: user._id,
    }).save();
    // call the email function
    sendResetCode(user.email, user.first_name, code);
    return res.status(200).json({
      message: 'Password reset code has been sent to your email',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.validateResetCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });
    const Dbcode = await Code.findOne({ user: user._id });
    if (Dbcode.code !== code) {
      return res.status(400).json({
        message: 'Verification code is wrong..',
      });
    }
    return res.status(200).json({ message: 'ok' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.changePassword = async (req, res) => {
  const { email, password } = req.body;

  const cryptedPassword = await bcrypt.hash(password, 12);
  await User.findOneAndUpdate(
    { email },
    {
      password: cryptedPassword,
    }
  );
  return res.status(200).json({ message: 'ok' });
};


// exports.auth = (req, res) => {
//   res.json('welcome auth');
// };
