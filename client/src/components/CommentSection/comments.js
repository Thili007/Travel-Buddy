// import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const CommentSection = () => {
  const post = useSelector((state) => state.posts.posts.comments);

  // useEffect(() => {}, [post]);

  // console.log(post);

  return (
    <Box>
      <Box>
        <Box>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {post?.map((c, i) => (
            <Box key={i}>
              <Typography gutterBottom variant="subtitle1">
                <strong>{c.split(": ")[0]}</strong>
                {c.split(":")[1]}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CommentSection;
