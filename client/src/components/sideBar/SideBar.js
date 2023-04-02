import { List, Paper } from "@mui/material";
import { MyListItem, MyListItemText } from "./styles";

import MemoryIcon from "@mui/icons-material/Memory";
import { useDispatch } from "react-redux";
import { setPage } from "../../reducers/displayPages";

const SideBar = () => {
  const dispatch = useDispatch();
  return (
    <Paper
      sx={{
        maxWidth: "100%",
        m: "1.5rem",
        p: "1.7rem",
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
    </Paper>
  );
};

export default SideBar;
