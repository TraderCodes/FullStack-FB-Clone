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
const { sendVerificationEmail } = require('../helpers/mailer');
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

// exports.auth = (req, res) => {
//   res.json('welcome auth');
// };
