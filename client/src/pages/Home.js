import { Box, useMediaQuery } from "@mui/material";
import { BoxMotion } from "../components/motions/Motions";
import SideBar from "../components/sideBar/SideBar";
import BuddyTrips from "../components/Posts/BuddyTrips";
import Memories from "../components/Posts/Memories";
import MyMemories from "../components/Posts/MyMemories";
import MyTrips from "../components/Posts/MyTrips";
import { useSelector } from "react-redux";
import MemoryCreater from "../components/Form/MemoryCreater/MemoryCreater";
import { NavBar } from "../components/Navbar/NavBar";

const Home = () => {
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  const displayPage = useSelector((state) => state.displayPages);

  return (

    <Box bgcolor={"background.default"} color={"text.primary"}>
      <NavBar />
      
        <Box
          width="100%"
          padding="2rem 6%"
          display={isNonMobileScreen ? "flex" : "block"}
          gap="2rem"
          justifyContent="space-between"
        >
          {isNonMobileScreen && (
            <BoxMotion
              // animate={{ x: [0, 20] }}
              transition={{ ease: "easeInOut", duration: 2 }}
              flexBasis={isNonMobileScreen ? "26%" : undefined}
              maxWidth={isNonMobileScreen ? "26%" : undefined}
              sx={{ mr: "30px", ml: 0 }}
            >
              <Box
                position={isNonMobileScreen ? "fixed" : undefined}
                // bgcolor={"#e8f5e9"}
                width="26%"
              >
                <SideBar />
              </Box>
            </BoxMotion>
          )}
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
                <MemoryCreater />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Home;
