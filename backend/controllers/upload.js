const Post = require('../models/Post');
const cloudinary = require('cloudinary')
exports.uploadImages = async (req, res) => {
  try {
    // save to post in module
    
    res.json('image uploaded');
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
