import { createSlice } from "@reduxjs/toolkit";

const displayPagesSlice = createSlice({
  name: "displayPages",
  initialState: "memories",
  reducers: {
    setPage: (state, action) => {
      return action.payload;
    },
  },
});

export const { setPage } = displayPagesSlice.actions;
export default displayPagesSlice.reducer;
