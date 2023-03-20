import { List } from "@mui/material";
import { MyListItem, MyListItemText } from "./styles";

import MemoryIcon from "@mui/icons-material/Memory";
import { Stack } from "@mui/system";
import { useDispatch } from "react-redux";
import { setPage } from "../../reducers/displayPages";

const SideBar = () => {
  const dispatch = useDispatch();
  return (
    <Stack
      sx={{
        overflowY: "auto",
        height: { sx: "auto", md: "95%" },
      }}
    >
      <List component="nav">
        <MyListItem onClick={() => dispatch(setPage("memories"))}>
          <MemoryIcon />
          <MyListItemText primary="Memories" />
        </MyListItem>
        <MyListItem onClick={() => dispatch(setPage("buddyTrips"))}>
          <MemoryIcon />
          <MyListItemText primary="Buddy Trips" />
        </MyListItem>
        <MyListItem onClick={() => dispatch(setPage("myMemories"))}>
          <MemoryIcon />
          <MyListItemText primary="My Memories" />
        </MyListItem>
        <MyListItem onClick={() => dispatch(setPage("myTrips"))}>
          <MemoryIcon />
          <MyListItemText primary="My Trips" />
        </MyListItem>
      </List>
    </Stack>
  );
};

export default SideBar;
