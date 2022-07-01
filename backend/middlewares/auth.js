const jwt = require('jsonwebtoken');

exports.authUser = async (req, res, next) => {
  try {
    let tmp = req.header('Authorization');
    // add bearer in front of token for sercurity
    // only get the token , so we slice Bearer
    const token =tmp? tmp.slice(7, tmp.length):"";
    // if not token then invalid
    if (!token) {
      return res.status(400).json({ error: 'Invalid Authentication' });
    }
    jwt.verify(token,process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(400).json({ error: 'Invalid Authentication' });
      }
      // if valid
      // Add user id into user object
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
