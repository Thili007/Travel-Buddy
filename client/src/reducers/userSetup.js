import { createSlice } from "@reduxjs/toolkit";

const userState = {
  user_id: null,
  token: null,
};

const userSetupSlice = createSlice({
  name: "userSetup",
  initialState: userState,
  reducers: {
    setUserData: (state, action) => {
      state.user_id = action.payload.user_id;
      state.token = action.payload.token;
    },
  },
});

export const { setUserData } = userSetupSlice.actions;

export default userSetupSlice.reducer;
