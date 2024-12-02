const Users = require("../../models/userModel.js");
const Comment = require("../../models/commentModel.js");
const { v4: uuidv4 } = require('uuid');
const Posts = require("../../models/postModel.js");

const generateUniquePostID = async () => {
  let uniqueId;
  let exists = true;

  while (exists) {
    uniqueId = uuidv4();
    exists = await Comment.findOne({ postID: uniqueId });
  }

  return uniqueId;
};

const createComment = async (req, res) => {
    const { userEmail, commentMessage, parentPost } = req.body;
    console.log(req.body);
    try {
        const user = await Users.findOne({ email: userEmail});
        if(!user){
            return res.status(404).json({message: "User can not be found."});
        }
        
        const post = await Posts.findOne({ postID: parentPost});
        if(!post) {
            return res.status(404).json({message: "Post can not be found."});
        }
        //print("found post");

        const newComment = new Comment({
            username: user.name,
            userID: user.id,
            commentID: await generateUniquePostID(),
            message: commentMessage,
            parentPostID: parentPost,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        const saveComment = await newComment.save();

        if(!user.comments){
            user.comments=[]
        }
        if(!user.comments.includes(saveComment.commentID)){
            user.comments.push(saveComment.commentID)
        }

        if(!post.comments){
            post.comments=[]
        }
        if(!post.comments.includes(saveComment.commentID)){
            post.comments.push(saveComment.commentID);
        }

        await post.save();

        await user.save();

        return res.status(201).json({ 
            message: "Post created successfully", 
        });

    } 
    catch (error) {
        res.status(500).json({message: error.message});
    }
}


const deleteComment = async (req, res) => {
    try{
        const { commentID, commentUserID } = req.body
        const comment = await Comment.findOne({ commentID });
        if(!comment){
            res.status(404).json({message: "Comment could not be found"});
        }
        comment.username = "";
        // Should users still be able to see their old posts even if their info does not appear?
        const user = await Users.findOne({ id: commentUserID });
        if(!user){
            return res.status(404).json({message: "User can not be found."});
        }
        if (user.comments.includes(postId)) {
            user.comments = user.comments.filter((commentID) => commentos !== commentID);
            await user.save();  // Save the updated user
        }
    } catch (error) {
        res.status(500).json({message: "Something went wrong deleting your post."});
    }
}

const updateComment = async(req, res) => {
    try {
        const {commentID, commentUser, commentMessage} = req.body

        const comment = await Comment.findOne({ commentID });
        if(!comment){
            res.status(404).json({message: "Post could not be found."});
        }
        if(comment.userId != commentUser){
            res.status(200).json({message: "Edit access to post denied."})
            return;
        }
        comment.message = commentMessage;
        comment.updatedAt = new Date();
        await comment.save();

    }
    catch (error) {
        res.status(500).json({message: "Something went wrong deleting your post."});
    }
}

const getComments = async (req, res) => {
    const { postID } = req.body;

    try {
        // Find the post by its ID
        const post = await Posts.findOne({ postID });
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Find all comments related to this post
        const comments = await Comment.find({ commentID: { $in: post.comments } });

        // Send the comments back to the client
        return res.status(200).json(comments);
    } catch (error) {
        console.error("Error fetching comments for post:", error.message);
        return res.status(500).json({ message: "Something went wrong while fetching comments." });
    }
};

module.exports = {
    createComment,
    deleteComment,
    updateComment,
    getComments,
}