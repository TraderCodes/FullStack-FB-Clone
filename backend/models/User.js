
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, 'first name is required'],
      trim: true,
      text: true,
    },
    last_name: {
      type: String,
      required: [true, 'last name is required'],
      trim: true,
      text: true,
    },
    username: {
      type: String,
      required: [true, 'User name is required'],
      trim: true,
      text: true,
    },
    email: {
      type: String,
      required: [true, 'first name is required'],
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ,
        'Please enter right email',
      ],
    },
    password: {
      type: String,
      required: [true, 'first name is required'],
    },
    picture: {
      type: String,
      default: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Head.svg',
    },
    cover: {
      type: String,
    },
    // GENDER
    gender: {
      type: String,
      required: [true, 'first name is gender is required'],
      trim: true,
    },
    // BIRTH YEAR
    bYear: {
      type: Number,
      required: true,
      trim: true,
    },
    bYear: {
      type: Number,
      required: true,
      trim: true,
    },
    bMonth: {
      type: Number,
      required: true,
      trim: true,
    },
    bDay: {
      type: Number,
      required: true,
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    freinds: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    // from freind request
    requests: {
      type: Array,
      default: [],
    },
    search: [
      {
        user: { type: ObjectId, ref: 'User' },
      },
    ],

    // Added details area
    details: {
      bio: {
        type: String,
      },
      otherName: {
        type: String,
      },
      job: {
        type: String,
      },
      workplace: {
        type: String,
      },
      highschool: {
        type: String,
      },
      college: {
        type: String,
      },
      currentCity: {
        type: String,
      },
      hometown: {
        type: String,
      },
      relationship: {
        // Relationship status area
        type: String,
        enum: ['Single', 'In a relationship', 'Married', 'Divorced'],
      },
      instagram: {
        type: String,
      },
    },
    // For user saved post
    savedPost: [
      {
        post: {
          type: ObjectId,
          ref: 'Post',
        },
        savedAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('User',userSchema)
