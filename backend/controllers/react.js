const React = require('../models/React');
const User = require('../models/User');
const mongoose = require('mongoose');

exports.reactPost = async (req, res, next) => {
  try {
    const { postId, react } = req.body;
  } catch (error) {
    return res.status(500).json({
   
      message: 'error.message',
    });
  }
};
