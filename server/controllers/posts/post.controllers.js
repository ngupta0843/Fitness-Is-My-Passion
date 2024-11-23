const Posts = require("../../models/postModel.js");

const getPost = async(req, res) => {
    try{
        const { username, caption} = req.query;
        const post = await Posts.findOne({ username: username, caption: caption})

        if (!post){
            return res.status(404).json({message: "Post not found"});
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({message: "Error getting post: ", error});
    }
}

const likePost = async(req, res) => {
    try{
        const { postId } = req.query;
        if (!postId) { 
            console.log(req);
            return res.status(400).json({ error: "Bad Post ID." });
        }

        const updatedPost = await Posts.findOneAndUpdate(
            { postId },
            { $inc: { likesCount: 1 } },
            { new: true }
        );
        
        if (!updatedPost) { 
            return res.status(404).json({ error: "Post not found." });
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        console.error("Error liking post:", error);
        res.status(500).json({ error: "Internal server error." });
    }
    
};

const createPost = async (req, res) => {
    try{
        const { postID, postText, postImage, postAuthor, postCaption, postisText, postWorkoutTitle} = req.query;
        if (!postID || !(postText || postImage) || !postAuthor || !postCaption || !postisText) { 
            return res.status(400).json({ error: "Missing required query parameters." });
        }
        const newPost = new Posts({
            postID: postID,
            username: postAuthor,
            workout: postWorkoutTitle,
            caption: postCaption,
            photo: postImage,
            text: postText,
            isTextPost: postisText,
            likecount:0,
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};

const fetchRandomPost = async (req, res) => {
    try{
        const randomPosts = await Posts.aggregate([{$sample: {size: 1}}]);
        res.json(randomPosts);
    } catch(error){
        res.status(500).json({message: "Error fetching random post", error});
    }
};

module.exports = {likePost, createPost, getPost, fetchRandomPost};