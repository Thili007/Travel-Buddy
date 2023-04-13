import { useDispatch, useSelector } from "react-redux";
import { Image } from "mui-image";
import {
  Button,
  Collapse,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  Typography,
  CardActions,
  Box,
  Skeleton,
  Stack,
  TextField,
} from "@mui/material";
import { BoxMotion } from "../motions/Motions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaceIcon from "@mui/icons-material/Place";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  getPosts,
  deletePost,
  likePosts,
  commentPost,
} from "../../actions/posts";
import { setLoading } from "../../reducers/pageLoader";
import { deletedPost, getPostID, setPost } from "../../reducers/posts";
import { TfiCommentAlt } from "react-icons/tfi";
import { TbEdit } from "react-icons/tb";
import { BsHeart } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommentSection from "../CommentSection/comments";

const Memories = () => {
  const user = JSON.parse(localStorage.getItem("USER_DETAILS"));
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts.post);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post?.comments);
  const [commentBox, setCommentBox] = useState([]);
  const [postSettings, setPostSettings] = useState(new Map());

  const open = Boolean(postSettings);
  const loading = useSelector((state) => state.pageLoader);

  const posts = useSelector((state) => state.posts.posts);
  const [likes, setLikes] = useState(null);

  console.log("Memory Posts", posts);
  console.log("Memory likes", likes);

  // const id = useSelector((state) => state.posts.post_id);

  const userId = localStorage.getItem("USER_ID");

  console.log("userID", userId);
  const hasLikedPost = posts?.find((post) =>
    post._id === likes
      ? post.likes.filter((item) =>
          item === userId ? "Post liked" : "post not Liked"
        )
      : null
  );
  //post.likes.includes((id) =>
  //   id === userId ? "has Liked" : "not Liked"
  // );

  console.log("post liked", hasLikedPost);
  const handlePostSettingsOpen = (postId, event) => {
    setPostSettings((prev) => new Map(prev).set(postId, event.currentTarget));
  };

  const handlePostSettingsClose = (postId) => {
    setPostSettings((prev) => {
      const newMap = new Map(prev);
      newMap.delete(postId);
      return newMap;
    });
  };

  // to toggle comment box
  const toggleCommentBox = (postId) => {
    setCommentBox((prevCommentBoxes) => ({
      ...prevCommentBoxes,
      [postId]: !prevCommentBoxes[postId],
    }));
    dispatch(setPost(postId));
  };

  const handleComment = (postId) => {
    const newComments = dispatch(
      commentPost(`${user?.userName}: ${comment}`, postId)
    );

    setComments(newComments);
    setComment("");

    // commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleItemClick = (id) => {
    dispatch(getPostID(id));
  };
  const handleDelete = (id) => {
    toast.error("You Deleted Your Memory", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    dispatch(deletePost(id));
    dispatch(deletedPost(id));
  };

  const handleLike = async (id) => {
    dispatch(likePosts(id));
    setLikes(id);

    // if (hasLikedPost) {
    //   setLikes(posts.likes.filter((id) => id !== userId));
    //   toast.success("You liked a Memory", {
    //     position: "top-right",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    // } else {
    //   setLikes(posts.likes || []);
    //   toast.error("You Disliked a Memory", {
    //     position: "top-right",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    // }
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 3000);
    dispatch(getPosts());
  }, [dispatch, comments]);

  return (
    <BoxMotion
      animate={{ y: [0, 20] }}
      transition={{ ease: "easeInOut", duration: 1 }}
      variant="filled"
      m="2rem 0"
      sx={{
        padding: "1.5rem 1.5rem 0.75rem 1.5rem",
        borderRadius: "0.75rem",
      }}
    >
      {posts?.map((post) => {
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
            {loading ? (
              <Skeleton
                variant="circular"
                width="80px"
                height="80px"
                animation="wave"
              />
            ) : (
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: "#a5d6a7", color: "#fafafa" }}>
                    {post.user.userName.toUpperCase().charAt(0)}
                  </Avatar>
                }
                title={post.title}
                subheader={moment(post.createdAt).fromNow()}
                action={
                  <Box>
                    {user?.userName === post?.user?.userName && (
                      <Tooltip title="Post Settings">
                        <IconButton
                          aria-label="settings"
                          onClick={(event) =>
                            handlePostSettingsOpen(post._id, event)
                          }
                          sx={{ ml: 2 }}
                          aria-controls={open ? "account-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                }
              />
            )}
            <Menu
              anchorEl={postSettings.get(post._id)}
              id={`post-menu-${post._id}`}
              open={Boolean(postSettings.get(post._id))}
              onClose={() => handlePostSettingsClose(post._id)}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(50,50,0,0))",

                  "& .MuiAvatar-root": {
                    width: "0px",
                    height: "80px",
                    ml: "0.5rem",
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: "-14px",
                    width: "20px",
                    height: "10px",
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={() => handleItemClick(post._id)}>
                <ListItemIcon>
                  <TbEdit />
                </ListItemIcon>
                Edit
              </MenuItem>
              <MenuItem onClick={() => handleDelete(post._id)}>
                <ListItemIcon>
                  <RiDeleteBin6Line />
                </ListItemIcon>
                Delete
              </MenuItem>
            </Menu>
            {loading ? (
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                animation="wave"
              />
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: "5px",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {post.message}
                </Typography>
                <Box>
                  {post.location}
                  <PlaceIcon sx={{ color: "#9e9e9e" }} />
                </Box>
              </Box>
            )}

            <CardContent>
              {loading ? (
                <Skeleton
                  variant="rectangular"
                  width="400px"
                  height="350px"
                  animation="wave"
                />
              ) : (
                <Image
                  src={post.pictures}
                  width="100%"
                  height="100%"
                  fit="contain"
                />
              )}
            </CardContent>

            <CardActions>
              {loading ? (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="40px"
                  animation="wave"
                />
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Stack>
                    <IconButton
                      sx={{ display: "flex", gap: "10px" }}
                      onClick={() => handleLike(post._id)}
                    >
                      {post.likes.length > 0 ? (
                        <FavoriteIcon sx={{ color: "#f44336" }} />
                      ) : (
                        <BsHeart color="green" size={"1.6rem"} />
                      )}
                      {post.likes.length}
                    </IconButton>
                  </Stack>
                  <Stack
                    sx={{ display: "flex", flexDirection: "row", gap: "10px" }}
                  >
                    <IconButton
                      sx={{ display: "flex", gap: "10px" }}
                      onClick={() => toggleCommentBox(post._id)}
                    >
                      <TfiCommentAlt />
                      {post.comments.length}
                    </IconButton>

                    <TextField
                      label="Add a Comments...."
                      sx={{ marginLeft: "50px" }}
                      onChange={(e) => setComment(e.target.value)}
                      value={comment}
                    />
                  </Stack>
                  <Button onClick={() => handleComment(post._id)}>
                    <PlayArrowIcon fontSize="large" />
                  </Button>
                </Box>
              )}
            </CardActions>
            {commentBox[post._id] && (
              <Collapse
                in={commentBox[post._id]}
                collapsedSize="100px"
                timeout={800}
                sx={{
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <Typography variant="p">
                  <CommentSection />
                </Typography>
              </Collapse>
            )}
          </Card>
        );
      })}
    </BoxMotion>
  );
};

export default Memories;
