// import User temp from model
const { validateEmail: validateLength } = require('../helpers/validation');
const User = require('../models/User');
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
      return res
        .status(400)
        .json({ message: 'First name must be 3-30 Letters' });
    }
    if (!validateLength(last_name, 3, 30)) {
      return res.status(400).json({ message: 'Type more please :)' });
    }
    if (!validateLength(password, 3, 30)) {
      return res.status(400).json({ message: 'Needs 3-30 Characters' });
    }

    const user = await new User({
      first_name,
      last_name,
      email,
      password,
      username,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();
    res.json(user);
    // save and response with the new user
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
