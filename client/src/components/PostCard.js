import React, { useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, Form, Ref } from "semantic-ui-react";

import Badge from "@mui/material/Badge";
import Popover from "./Popover";
import Comments from "./Comments";
import "../App.css";
// import { SocialContext } from "./Context";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -4,
    opacity: 0.8,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
export default function PostCard({ post }) {
  console.log("posts", post);
  //popover
  const [anchorEl, setAnchorEl] = useState(null);
  // const { state } = useContext(SocialContext);
  const mainRef = useRef(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCommentClick = () => {
    if (!expanded) {
      setExpanded(true);
      setTimeout(() => mainRef.current?.firstChild.focus(), 100);
    }
  };
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card className="mb-2 postCard">
      <CardHeader
        avatar={
          (
            <img
              src={post?.author?.profileImage}
              className="rounded-circle"
              style={{ width: "40px", height: "40px" }}
              alt=""
            />
          ) ||
          (<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {/* {` ${state.user.name[0]}${state.user.name[5]}`} */}
          </Avatar>)()
        }
        action={
          <IconButton
            aria-label="settings"
            onClick={null}
            className="iconButton"
          >
            <MoreVertIcon
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Popover
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                open={open}
                handleClick={handleClick}
                handleClose={handleClose}
              />
            </MoreVertIcon>
          </IconButton>
        }
        title={post?.title || "Post Title"}
        subheader={post?.createdAt || Date()}
      />
      <CardMedia
        component="img"
        height={post?.postImage && "194"}
        image={post?.postImage || ""}
        alt="Post img"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post?.text || "post-text"}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" className="me-2">
          <StyledBadge badgeContent={4} color="warning">
            <FavoriteIcon />
          </StyledBadge>
        </IconButton>
        <IconButton aria-label="comment" onClick={handleCommentClick}>
          <CommentIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {/* reply form */}
          <Comments />
          <Form reply>
            <Ref innerRef={mainRef}>
              <Form.TextArea />
            </Ref>
            <Button
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
        </CardContent>
      </Collapse>
    </Card>
  );
}
