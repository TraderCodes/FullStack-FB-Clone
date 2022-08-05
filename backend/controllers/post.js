const Post = require('../models/Post');
exports.createPost = async (req, res) => {
  try {
    // save to post in module
    const post = await new Post(req.body).save();
    res.json(post)
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'first_name last_name picture username gender')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.comment = async (req, res) => {
  try {

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};