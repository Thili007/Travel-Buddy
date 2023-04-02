import { createSlice } from "@reduxjs/toolkit";

const changeModeState = {
  mode: "light",
};

const changeModeSlice = createSlice({
  name: "changeMode",
  initialState: changeModeState,
  reducers: {
    setMode: (state, action) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setMode } = changeModeSlice.actions;

export default changeModeSlice.reducer;
