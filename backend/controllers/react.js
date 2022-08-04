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
exports.getReacts = async (req, res) => {
  try {
    //  const reactsArray = await React.find({ postRef: req.params.id });

    // const check1 = reacts.find(
    //   // check if user is the same as the login user
    //   (x) => x.reactBy.toString() == req.user.id
    // )?.react;
     const newReacts = reactsArray.reduce((group, react) => {
       let key = react['react'];
       group[key] = group[key] || [];
       group[key].push(react);
       return group;
     }, {});

    //  const reacts = [
    //    {
    //      react: 'like',
    //      count: newReacts.like ? newReacts.like.length : 0,
    //    },
    //    {
    //      react: 'love',
    //      count: newReacts.love ? newReacts.love.length : 0,
    //    },
    //    {
    //      react: 'haha',
    //      count: newReacts.haha ? newReacts.haha.length : 0,
    //    },
    //    {
    //      react: 'sad',
    //      count: newReacts.sad ? newReacts.sad.length : 0,
    //    },
    //    {
    //      react: 'wow',
    //      count: newReacts.wow ? newReacts.wow.length : 0,
    //    },
    //    {
    //      react: 'angry',
    //      count: newReacts.angry ? newReacts.angry.length : 0,
    //    },
    //  ];
    const reacts = await React.find({ postRef: req.params.id });
    const check = await React.findOne({
      postRef: req.params.id,
      reactBy: req.user.id,
    });
    //  const user = await User.findById(req.user.id);
    //  const checkSaved = user?.savedPosts.find(
    //    (x) => x.post.toString() === req.params.id
    //  );
    res.json({
      reacts,
      //   //  check can be undefined
      check: check?.react,
      //  total: reactsArray.length,
      //  checkSaved: checkSaved ? true : false,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
