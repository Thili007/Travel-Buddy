import * as yup from "yup";

export const MemorySchema = yup
  .object({
    title: yup.string().required("Please add Title For Your Memory"),
    message: yup
      .string()
      .required("Please add Nice Description about Your Memory"),
    tags: yup.string().required("Please add  at least one Tag"),
    location: yup.string().required("Please add location to know"),
    date: yup.date().required("Please add  Date"),
  })
  .required();
