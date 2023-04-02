import { createSlice } from "@reduxjs/toolkit";

const loaderState = {
  loading: true,
};

const pageLoaderSlice = createSlice({
  name: "pageLoader",
  initialState: loaderState,
  reducers: {
    setLoading: (state, action) => {
      return action.payload;
    },
  },
});

export const { setLoading } = pageLoaderSlice.actions;

export default pageLoaderSlice.reducer;
