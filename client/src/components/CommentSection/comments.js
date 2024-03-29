// import { useState } from "react";
import { Box, Typography } from "@mui/material";

const CommentSection = ({ comments }) => {
  return (
    <Box>
      <Box>
        <Box>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments?.map((c, i) => (
            <Box key={i}>
              <Typography gutterBottom variant="subtitle1">
                <strong>{c?.split(": ")[0]}</strong>
                {c?.split(":")[1]}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CommentSection;
