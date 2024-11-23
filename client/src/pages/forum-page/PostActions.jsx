import React, { useEffect, useState } from 'react';
import { Icon, IconButton, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import axios from "axios";


function PostActions({ username, caption, initialLikeCount }) {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(initialLikeCount);
    const [postID, setPostID] = useState(null);
  
    useEffect(() => {
      const fetchPostID = async () => {
        try {
          const response = await axios.get(
            'http://localhost:8088/posts/getPost?username=${username}&caption=${caption}'
          );
          setPostID(response.data.postID); 
        } catch (error) {
          console.error("Error fetching postID:", error);
        }
      };
  
      fetchPostID();
    });
  
    const handleLike = async () => {
      if (!postID) {
        console.error("PostID not found!");
        return;
      }
  
      try {
        await axios.post('http://localhost:8088/posts/likePost?postID=${postID}');
        setLikeCount((prev) => prev + 1);
        setLiked(!liked);
      } catch (error) {
        console.error("Error liking post:", error);
      }
    };

    return(
        <div style={{display: 'flex', justifyContent: 'space-between' }}>
            <div>
                <Tooltip title="Like">
                    <IconButton onClick={handleLike} sx={{color : liked ? 'red' : 'white' }} >
                        <FavoriteIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Comment">
                    <IconButton color="default" sx={{color : 'white'}}>
                        <CommentIcon />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    );
}
export default PostActions;
