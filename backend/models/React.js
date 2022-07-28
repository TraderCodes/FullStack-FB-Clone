const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
// React stands for reaction icons
const reactSchema = new mongoose.Schema({
  react: {
    type: String,
    enum: ['like', 'love', 'haha', 'sad', 'angry', 'wow'],
    required: true,
  },
  // the content we react to
  postRef: {
    type: ObjectId,
    ref: 'Post',
  },
  reactby: {
    type: ObjectId,
    ref: 'User',
  },
});
module.exports = mongoose.model('React', reactSchema);
