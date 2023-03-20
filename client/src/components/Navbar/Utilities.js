import { Navigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { SiYourtraveldottv } from "react-icons/si";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { BiTrip } from "react-icons/bi";
import Memories from "../Posts/Memories";
import Home from "../../pages/Home";

export const utilities = [
  { name: "NOTIFICATIONS", icon: <NotificationsIcon />, navi: "undefined" },
  { name: "SEARCH", icon: <SearchIcon />, navi: "undefined" },
  {
    name: "MEMORIES",
    icon: <AccessTimeFilledIcon />,
    navi: "memories",
  },
  { name: "BUDDY TRIPS", icon: <SiYourtraveldottv />, navi: "buddyTrips" },
  {
    name: "MY MEMORIES",
    icon: <MdOutlinePhotoSizeSelectActual />,
    navi: "myMemories",
  },
  { name: "MY TRIPS", icon: <BiTrip />, navi: "myTrips" },
];
