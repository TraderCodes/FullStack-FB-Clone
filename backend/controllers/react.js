const React = require('../models/React');
const User = require('../models/User');
const mongoose = require('mongoose');

exports.reactPost = async (req, res) => {
  try {
    const { postId, react } = req.body;
    const check = await React.findOne({
      postRef: postId,
      // bellow is from authuser middleware
      reactBy: mongoose.Types.ObjectId(req.user.id),
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
