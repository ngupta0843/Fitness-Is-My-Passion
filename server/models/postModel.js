const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  postID: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  workout: {
    type: String,
    required: false
  },
  caption: {
    type: String,
    required: true
  },
  likecount: {
    type: Number,
    default: 0
  },
  likedUsers: {
    type: Array,
    default: []
  },
  photo: {
    type: String // filepath of photo
  },
  text: {
    type: String
  },
  isTextPost: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    enum: ['small', 'medium', 'large'], 
    default: 'medium'
  },
  comments: [
    {
      type: String,
      default: [],
      sparse: true,
    },
  ]
});

const Posts = mongoose.model("Posts", postSchema);

module.exports = Posts, postSchema;

