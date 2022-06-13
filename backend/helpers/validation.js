exports.validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);
};

exports.validateLength = (text, min, max) => {
  if (text.length >= max || text.length <= min) {
    return false;
  }
  return true;
};

exports.validateUsername = async (username) => {
  let a = false;
  do {
    let check = await User.findOne({ username });
    if (check) {
      // everytime we look through and check if the username exists we just add a number at the end
  
      a = true;
    } else {
      a = false;
    }
  } while (a); //while a is true loop again
  return username;
};
