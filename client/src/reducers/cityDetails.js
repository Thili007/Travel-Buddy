import { createSlice } from "@reduxjs/toolkit";

const cityState = {
  cities: [],
};

const citiesSlice = createSlice({
  name: "cities",
  initialState: cityState,
  reducers: {
    fetchCities: (state, action) => {
      state.cities = action.payload;
    },
  },
});

export const { fetchCities } = citiesSlice.actions;

export default citiesSlice.reducer;
