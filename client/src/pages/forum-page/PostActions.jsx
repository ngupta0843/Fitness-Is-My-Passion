import React, { useEffect, useState } from "react";
import { IconButton, Tooltip, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import axios from "axios";
import { useSelector } from "react-redux";
import CommentsSection from "./CommentsSection";

function PostActions({ post }) {
  const user = useSelector((state) => state.user);
  const [liked, setLiked] = useState(post.likedUsers.includes(user.email));
  const [likeCount, setLikeCount] = useState(post.likecount);
  const [showComments, setShowComments] = useState(false); // Toggle state for comments
  const postID = post._id;

  const handleLike = async () => {
    if (!postID) {
      console.error("PostID not found!");
      return;
    }

    try {
      console.log("liking posts request");
      const response = await axios.post("http://localhost:8088/posts/likePost", {
        postId: postID,
        user: user.email,
      });

      setLiked(response.data.likedUsers.includes(user.email));
      setLikeCount(response.data.likecount);

      console.log(response);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
      {/* Like Button */}
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Tooltip title="Like">
          <IconButton
            onClick={handleLike}
            sx={{ color: liked ? "red" : "white", transition: "color 0.3s ease" }}
          >
            <FavoriteIcon />
          </IconButton>
        </Tooltip>

        {/* Like Count */}
        <Typography variant="body2" color="white" sx={{ marginTop: 0 }}>
          {likeCount}
        </Typography>

        {/* Comment Button */}
        <Tooltip title="Comment">
          <IconButton
            color="default"
            sx={{ color: "white" }}
            onClick={() => setShowComments(!showComments)}
          >
            <CommentIcon />
          </IconButton>
        </Tooltip>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div style={{ marginTop: "10px", width: "100%" }}>
          <CommentsSection postID={post.postID} commentorEmail={user.email}/>
        </div>
      )}
    </div>
  );
}

export default PostActions;
