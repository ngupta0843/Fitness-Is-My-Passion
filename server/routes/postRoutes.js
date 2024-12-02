const express = require("express");
const { likePost, createPost, getPost, fetchRandomPost, fetchAndSortPosts } = require("../controllers/posts/post.controllers.js");

const router = express.Router();
router.post("/likePost", likePost);
// router.get("/likePost", likePost);
router.post("/createPost", createPost);
router.get("/getPost", getPost);
router.get('/fetchRandomPost', fetchRandomPost);
router.get('/fetchAndSortPosts', fetchAndSortPosts);
module.exports = router;
