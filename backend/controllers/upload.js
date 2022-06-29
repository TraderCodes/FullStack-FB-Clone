const Post = require('../models/Post');
exports.uploadImages = async (req, res) => {
  try {
    // save to post in module
    
    res.json('image upload');
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
