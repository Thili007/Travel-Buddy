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
import CityInput from "../cityInput";

const MemoryCreater = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.posts.post_id);
  const post = useSelector((state) =>
    id
      ? state.posts.posts.find((item) => item._id === id) ||
        state.posts.userPosts.find((item) => item._id === id)
      : null
  );

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

  // On Submit
  const onSubmit = (data) => {
    toast.success("You added your Memory", {
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
      const newData = {
        ...post, // start with the current post data
        ...data, // add new data to replace the old values
      };
      dispatch(updatePosts(id, newData));
    } else {
      dispatch(createPosts(data));
    }
    clearAll();
  };

  const clearAll = () => {
    dispatch(getPostID(null));
    reset({
      title: "",
      message: "",
      tags: "",
      location: "",
      date: "",
      pictures: "",
    });
    setValue("location", {});
  };

  useEffect(() => {
    if (post) {
      reset(post);
      setValue("location", post?.location);
    }
  }, [dispatch, id, post, reset, setValue]);

  return (
    <Paper
      sx={{
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        m: "1.5rem",
        padding: "1.5rem",
        zIndex: 20,
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
            <CityInput setValue={setValue} />
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
          error={!!errors?.date?.type}
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
