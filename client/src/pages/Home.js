import { Box, useMediaQuery } from "@mui/material";
import { Stack } from "@mui/system";

import SideBar from "../components/sideBar/SideBar";
import BuddyTrips from "../components/Posts/BuddyTrips";
import Memories from "../components/Posts/Memories";
import MyMemories from "../components/Posts/MyMemories";
import MyTrips from "../components/Posts/MyTrips";
import { useSelector } from "react-redux";

const Home = () => {
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  const displayPage = useSelector((state) => state.displayPages);

  return (
    <Box bgcolor={"background.default"} color={"text.primary"}>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreen ? "flex" : "block"}
        gap="2rem"
        justifyContent="space-between"
      >
        <Box flex={1} p={2} flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <Stack
            position={isNonMobileScreen ? "sticky" : undefined}
            bgcolor={"#e8f5e9"}
            width="100%"
          >
            <SideBar />
          </Stack>
        </Box>
        <Box
          flexBasis={isNonMobileScreen ? "44%" : undefined}
          mt={isNonMobileScreen ? undefined : "2rem"}
          sx={{ backgroundColor: "#e8f5e9" }}
        >
          {displayPage === "memories" && <Memories />}
          {displayPage === "buddyTrips" && <BuddyTrips />}
          {displayPage === "myMemories" && <MyMemories />}
          {displayPage === "myTrips" && <MyTrips />}
        </Box>
        {isNonMobileScreen && (
          <Box flexBasis="26%">
            <Box position="fixed">
              <h1>Hello Box 3</h1>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;
