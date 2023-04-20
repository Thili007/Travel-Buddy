import { useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { useSelector } from "react-redux";

const CityInput = ({ setValue }) => {
  const id = useSelector((state) => state.posts.post_id);
  const post = useSelector((state) =>
    id
      ? state.posts.posts.find((item) => item._id === id) ||
        state.posts.userPosts.find((item) => item._id === id)
      : null
  );
  const [searchInput, setSearchInput] = useState(
    post ? post?.location?.city : ""
  );
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      axios
        .post(
          `http://localhost:4000/api/user/getAllCities?input=${searchInput}`
        )
        .then((data) => {
          setSuggestions(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    // Only fetch suggestions if the search input is not empty
    if (searchInput !== "") {
      fetchSuggestions();
    }
  }, [searchInput]);

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSelect = (event, selectedCity) => {
    setSearchInput("");

    setValue("location", selectedCity);
  };

  return (
    <Autocomplete
      id="City-select"
      sx={{ width: 200 }}
      options={suggestions}
      getOptionLabel={(option) => option.city}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
          key={option._id}
        >
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.iso2.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.iso2.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.city}, {option.country}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a City"
          inputProps={{
            ...params.inputProps,
          }}
          value={searchInput}
          onChange={handleInputChange}
        />
      )}
      onChange={handleSelect}
    />
  );
};

export default CityInput;
