import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import axios from 'axios';

const CommentsSection = ({ postID, commentorEmail }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [hideComments, setHideComments] = useState(false);

    console.log(postID);

    useEffect(() => {
        handleGetComments();
    }, []); 

    const handleAddComment = async () => {
        if (newComment.trim()) {
            try {
                await axios.post("http://localhost:8088/comment/createComment", {
                    userEmail: commentorEmail,
                    commentMessage: newComment,
                    parentPost: postID,
                });

                handleGetComments();

                setNewComment(""); // Clear the input field
            } catch (error) {
                console.error("Error adding comment:", error.response?.data || error.message);
            }
        }
    };

    const handleGetComments = async () => {
        try {
            const response = await axios.post("http://localhost:8088/comment/getComments", {
                postID: postID,
            });
            console.log("Fetched comments:", response.data);

            setComments(response.data.map(comment => ({
                text: comment.message,
                likes: 0,
                replies: [],
                hideReplies: false,
            })));
        } catch (error) {
            console.error("Error fetching comments:", error.response?.data || error.message);
        }
    };

    const toggleHideComments = () => {
        setHideComments(!hideComments);
    };

    const handleLikeComment = (index) => {
        const updatedComments = [...comments];
        updatedComments[index].likes++;
        setComments(updatedComments);
    };

    return (
        <Box sx={{ mt: 3, p: 2, borderRadius: 2, backgroundColor: '#121212', color: '#ffffff' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5">Comments</Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={toggleHideComments}
                    startIcon={hideComments ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                >
                    {hideComments ? "Show Comments" : "Hide Comments"}
                </Button>
            </Box>
            {!hideComments && (
                <>
                    <Box display="flex" gap={2} mb={2}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write a comment..."
                            sx={{ input: { color: '#ffffff' }, backgroundColor: '#333333', borderRadius: 1 }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddComment}
                            startIcon={<AddCommentOutlinedIcon />}
                        >
                            Comment
                        </Button>
                    </Box>
                    {comments.map((comment, index) => (
                        <Card key={index} sx={{ mb: 2, backgroundColor: '#1e1e1e', color: '#ffffff' }}>
                            <CardContent>
                                <Typography variant="body1">{comment.text}</Typography>
                                <Box display="flex" gap={1} mt={1} alignItems="center">
                                    <IconButton onClick={() => handleLikeComment(index)} sx={{ color: '#ffffff' }}>
                                        <ThumbUpAltOutlinedIcon />
                                        <Typography variant="caption" sx={{ ml: 0.5 }}>
                                            {comment.likes}
                                        </Typography>
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </>
            )}
        </Box>
    );
};

export default CommentsSection;
