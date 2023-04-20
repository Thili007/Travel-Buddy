import { createSlice } from "@reduxjs/toolkit";

const isAuthState = {
  isAuthenticate: false,
};

const isAuthSlice = createSlice({
  name: "isAuth",
  initialState: isAuthState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuthenticate = action.payload;
    },
  },
});

export const { setIsAuth } = isAuthSlice.actions;

export default isAuthSlice.reducer;
