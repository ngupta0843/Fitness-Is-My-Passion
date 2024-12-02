import React, { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";
import { Box, Stack } from "@mui/material";
import "./ForumPage.css";

function ForumPage() {
  const [posts, setPosts] = useState([]);

  // Fetch sorted posts on component mount
  useEffect(() => {
    const fetchSortedPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8088/posts/fetchAndSortPosts"
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchSortedPosts();
  }, []);

  return (
    <Box className="forum-page">
      {/* Top Post */}
      {posts.length > 0 && (
        <div className="top-post">
          <Post post={posts[0]} />
        </div>
      )}

      {/* Other Posts */}
      <Stack spacing={3} className="post-container">
        {posts.slice(1).map((post, index) => (
          <div className="post" key={index}>
            <Post post={post} />
          </div>
        ))}
      </Stack>
    </Box>
  );
}

export default ForumPage;
