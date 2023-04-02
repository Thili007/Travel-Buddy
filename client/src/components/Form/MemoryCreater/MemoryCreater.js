import { useEffect } from "react";
import { TextField, Button, Typography, Paper, Box, Card } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MemorySchema } from "./MemorySchema";
import { useDispatch, useSelector } from "react-redux";
import { createPosts, updatePosts } from "../../../actions/posts";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getPostID } from "../../../reducers/posts";

const MemoryCreater = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.posts.post_id);
  const post = useSelector((state) =>
    id ? state.posts.posts.find((item) => item._id === id) : null
  );
  console.log("current id", id);

  // React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(MemorySchema),
  });
  useEffect(() => {
    if (post) {
      reset(post);
    }
  }, [id, post, reset]);

  // On Submit
  const onSubmit = (data) => {
    toast.success("You add your Memory", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    if (id) {
      dispatch(updatePosts(id, data));
    } else {
      dispatch(createPosts(data));
    }
    clearAll();
  };
  const clearAll = () => {
    dispatch(getPostID(null));
    reset(null);
  };

  return (
    <Paper
      sx={{
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        m: "1.5rem",
        padding: "1.5rem",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-wrap justify-center gap-3"
      >
        {id ? (
          <Typography variant="h6">Please Fill your New Data</Typography>
        ) : (
          <Typography variant="h6">Create your Memory</Typography>
        )}

        <TextField
          sx={{ width: "100%" }}
          name="title"
          variant="outlined"
          label="Title"
          error={!!errors?.title?.type}
          {...register("title")}
        />
        {errors?.title?.type === "required" && (
          <Typography variant="p" sx={{ color: "red", width: "100%" }}>
            {errors.title.message}
          </Typography>
        )}

        <TextField
          name="message"
          variant="outlined"
          label="Message"
          error={!!errors?.message?.type}
          sx={{ width: "100%" }}
          multiline
          rows={4}
          {...register("message")}
        />
        {errors?.message?.type === "required" && (
          <Typography variant="p" sx={{ color: "red", width: "100%" }}>
            {errors.message.message}
          </Typography>
        )}
        <Card>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => {
              setValue("pictures", base64);
            }}
          />
        </Card>

        <Box display="flex" flexDirection="row" gap="1rem">
          <Box>
            <TextField
              sx={{ width: "100%" }}
              name="tags"
              variant="outlined"
              label="Tags"
              error={!!errors?.tags?.type}
              {...register("tags")}
            />
            {errors?.tags?.type === "required" && (
              <Typography variant="p" sx={{ color: "red", width: "100%" }}>
                {errors.tags.message}
              </Typography>
            )}
          </Box>
          <Box>
            <TextField
              sx={{ width: "100%" }}
              name="location"
              variant="outlined"
              label="Location"
              error={!!errors?.location?.type}
              {...register("location")}
            />
            {errors?.location?.type === "required" && (
              <Typography variant="p" sx={{ color: "red", width: "100%" }}>
                {errors.location.message}
              </Typography>
            )}
          </Box>
        </Box>
        <TextField
          sx={{ width: "100%" }}
          type="date"
          name="date"
          variant="outlined"
          error={!!errors?.location?.type}
          {...register("date")}
        />
        {errors?.date?.type === "required" && (
          <Typography variant="p" sx={{ color: "red", width: "100%" }}>
            {errors.date.message}
          </Typography>
        )}
        <Button type="submit" sx={{ padding: "20px" }} fullWidth>
          Submit
        </Button>
        <Button sx={{ padding: "20px" }} fullWidth onClick={clearAll}>
          Reset
        </Button>
      </form>
    </Paper>
  );
};

export default MemoryCreater;
