const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
// Schema(code) for Password change
const codeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  user: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
});
module.exports = mongoose.model('Code', codeSchema);
