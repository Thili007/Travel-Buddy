import * as api from "../api";
import { fetchCities } from "../reducers/cityDetails";

// Get all city details
export const getCityDetails = () => async (dispatch) => {
  try {
    const { data } = await api.getCityDetails();
    // console.log("City data", data);
    dispatch(fetchCities(data));
  } catch (error) {
    console.log(error);
  }
};
