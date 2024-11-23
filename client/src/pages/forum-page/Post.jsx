import React from "react";
import PostActions from "./PostActions";
import "./Post.css";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
} from "@mui/material";

const getPostSize = (size) => {
  switch (size) {
    case "small":
      return "50%";
    case "medium":
      return "80%";
    case "large":
      return "100%";
    default:
      return "70%";
  }
};

const PhotoPost = ({
  username,
  workout,
  caption,
  photo,
  likecount,
  user,
  size,
}) => {
  return (
    <Box sx={{ width: getPostSize(size), margin: "0 auto" }}>
      <Card
        sx={{
          width: getPostSize(size),
          backgroundColor: "black",
          color: "white",
          border: "2px solid white",
          borderRadius: "10px",
        }}
      >
        <CardHeader
          avatar={<Avatar src={user.profile_photo} alt={user.name} />}
          title={<strong>{username}</strong>}
          subheader={workout}
          titleTypographyProps={{ sx: { color: "white" } }}
          subheaderTypographyProps={{ sx: { color: "white" } }}
        />
        <CardMedia
          component="img"
          height={getPostSize(size)}
          aspectRatio="1"
          image={photo}
          alt="Post"
          sx={{ objectFit: "square" }} // Makes sure the image scales well within the card
        />

        <CardContent>
          <PostActions username={username} caption={caption} initialLikeCount={likecount} />
          <Typography variant="body2" color="white" marginLeft={1}>
            {likecount}
          </Typography>
          <Typography
            variant="body1"
            color="white"
            sx={{
              wordWrap: "break-word",
              overflowWrap: "break-word",
              whiteSpace: "normal",
            }}
          >
            <strong>{username}</strong>
            <span style={{ marginLeft: "0.3rem" }}>{caption}</span>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

const TextPost = ({ username, workout, caption, likecount, user, size }) => {
  return (
    <Box sx={{ width: getPostSize(size), margin: "0 auto" }}>
      <Card
        sx={{
          width: getPostSize(size),
          backgroundColor: "black",
          color: "white",
          border: "2px solid white",
          borderRadius: "10px",
        }}
      >
        <CardHeader
          avatar={<Avatar src={user.profile_photo} alt={user.name} />}
          title={<strong>{username}</strong>}
          subheader={workout}
          titleTypographyProps={{ sx: { fontweight: "bold", color: "white" } }}
          subheaderTypographyProps={{ sx: { color: "white" } }}
        />
        <CardContent>
          <Typography
            variant="body1"
            color="white"
            sx={{
              wordWrap: "break-word",
              overflowWrap: "break-word",
              whiteSpace: "normal",
            }}
          >
            {caption}
          </Typography>
          <PostActions username={username} caption={caption} initialLikeCount={likecount} />
          <Typography variant="body2" color="white" marginLeft={1}>
            {likecount}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

const Post = ({ username, workout, caption, photo, likecount, user, size }) => {
  const isPhotoPost = !!photo;

  return isPhotoPost ? (
    <PhotoPost
      username={username}
      workout={workout}
      caption={caption}
      photo={photo}
      likecount={likecount}
      user={user}
      size={size}
    />
  ) : (
    <TextPost
      username={username}
      workout={workout}
      caption={caption}
      likecount={likecount}
      user={user}
      size={size}
    />
  );
};

export default Post;
