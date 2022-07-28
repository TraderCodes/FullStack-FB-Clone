const React = require('../models/React');
const User = require('../models/User');
const mongoose = require('mongoose');

exports.reactPost = async (req, res, next) => {
  try {
    const { postId, react } = req.body;
    const check = await React.findById({
      postRef: postId,
      // bellow is from authuser middleware
      reactBy: mongoose.Type.ObjectId(req.user.id),
    });
    // if no react in database we creat one
    if (check == null) {
      const newReact = new React({
        react: react,
        postRef: postId,
        reactBy: req.user.id,
      });
      // save react
      await newReact.save();
      return res.status(200).json({
        success: true,
        message: 'success',
      });
    }
    // if the emote is the same we remove that user emote
    else {
      // react from database vs react body
      if (check.react == react) {
        await React.findByIdAndRemove(check._id);
      } else {
        await React.findByIdAndUpdate(check._id, { react: react });
        // change the data base react to react 
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: 'error.message',
    });
  }
};
