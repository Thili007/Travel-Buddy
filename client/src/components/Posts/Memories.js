import { useDispatch, useSelector } from "react-redux";

import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  Typography,
  CardActions,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaceIcon from "@mui/icons-material/Place";
import moment from "moment";
import { useEffect } from "react";
import { getPosts } from "../../actions/posts";

const Memories = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  console.log(posts);
  return (
    <Box
      m="2rem 0"
      sx={{
        padding: "1.5rem 1.5rem 0.75rem 1.5rem",

        borderRadius: "0.75rem",
      }}
    >
      {posts.map((post) => {
        return (
          <Card
            key={post._id}
            sx={{
              // maxWidth: 500,
              display: "flex",
              flexDirection: "column",
              padding: "20px",
              margin: "10px",
              border: "4px solid",
              borderColor: "#a5d6a7",
              borderRadius: 2,
              boxShadow: 10,
            }}
          >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "#a5d6a7", color: "#fafafa" }}>
                  {post.user.userName.toUpperCase().charAt(0)}
                </Avatar>
              }
              title={post.title}
              subheader={moment(post.createdAt).fromNow()}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                marginLeft: "auto",
                padding: "10px",
              }}
            >
              {post.location}
              <PlaceIcon sx={{ color: "#9e9e9e" }} />
            </Box>

            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {post.message}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton>
                <FavoriteIcon sx={{ color: "#ef5350" }} />
              </IconButton>
              {post.likeCount}
            </CardActions>
          </Card>
        );
      })}
    </Box>
  );
};

export default Memories;
