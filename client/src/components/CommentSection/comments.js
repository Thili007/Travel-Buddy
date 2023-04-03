import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const CommentSection = ({ commentsRef }) => {
  const post = useSelector((state) => state.posts.post.comments);

  console.log(post);

  return (
    <Box>
      <Box>
        <Box>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {/* <Box ref={commentsRef} /> */}
          {post?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(": ")[0]}</strong>
              {c.split(":")[1]}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CommentSection;
