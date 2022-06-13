// import User temp from model
const User = require('../models/User');
exports.register = async (req, res) => {
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
  } = req.body //get info from user input
  // information to re register to the user 
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
  }).save()
  res.json(user)
  // save and response with the new user
}
