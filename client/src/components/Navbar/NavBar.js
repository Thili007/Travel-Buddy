import { useLogout } from "../../hooks/useLogout";
import { useUserContext } from "../../hooks/useUserContext";
import { Link } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Toolbar,
  Button,
  Typography,
  IconButton,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import SnowshoeingSharpIcon from "@mui/icons-material/SnowshoeingSharp";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ArrowRight from "@mui/icons-material/ArrowRight";
import { Stack } from "@mui/system";
import { useState } from "react";
import { utilities } from "./Utilities";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPage } from "../../reducers/displayPages";
import Logo from "../../assets/LogoLight.png";

export const NavBar = ({ setMode, mode }) => {
  const { logout } = useLogout();
  const { user } = useUserContext();
  const dispatch = useDispatch();
  const [mobileMenu, setMobileMenu] = useState(false);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const logOutHandler = () => {
    logout();
  };

  return (
    <AppBar
      sx={{
        bgcolor: "background.default",
        position: "fixed",
        color: "text.primary",
      }}
    >
      <Toolbar>
        {/* <SnowshoeingSharpIcon sx={{ color: "#a5d6a7", fontSize: "60px" }} /> */}
        <Link to={"/"}>
          <img src={Logo} alt="" className=" w-[100px] h-[80px] " />
        </Link>
        <Typography
          fontFamily={"Gloria Hallelujah, cursive;"}
          variant="h1"
          sx={{ color: "#757575", fontSize: "30px", fontWeight: "bold" }}
          align={"center"}
        >
          <Link to={"/"}>Travel Buddy</Link>
        </Typography>

        {/* Desktop  */}
        {isNonMobileScreens ? (
          <Box
            sx={{
              ml: "auto",
              display: "flex",
              flexDirection: "row",
              gap: 4,
              alignItems: "center",
            }}
          >
            {user && (
              <Stack sx={{ ml: "auto" }}>
                <Avatar sx={{ bgcolor: "#a5d6a7" }}>
                  {user?.userName.charAt(0)}
                </Avatar>
              </Stack>
            )}
            {user && (
              <Box>
                <Tooltip
                  title={
                    mode === "light"
                      ? "Switch to DarkMode"
                      : "Switch to LightMode"
                  }
                  sx={{
                    "& svg": {
                      color: "text.primary",
                      transition: "0.2s",
                      transform: "translateX(0) rotate(0)",
                    },
                    "&:hover, &:focus": {
                      bgcolor: "background.default",
                      "& svg:first-of-type": {
                        transform: "translateX(-4px) rotate(-20deg)",
                      },
                      "& svg:last-of-type": {
                        right: 0,
                        opacity: 1,
                      },
                    },
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      height: "80%",
                      display: "block",
                      left: 0,
                      width: "1px",
                      bgcolor: "background.default",
                    },
                  }}
                >
                  <IconButton
                    onClick={(e) =>
                      setMode(mode === "light" ? "dark" : "light")
                    }
                  >
                    {mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
                    <ArrowRight
                      sx={{ position: "absolute", right: 4, opacity: 0 }}
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Notifications">
                  <IconButton aria-label="Notifications">
                    <NotificationsIcon
                      sx={{ color: "#a5d6a7", fontSize: "35px" }}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
            {user && (
              <Stack
                sx={{
                  ml: "auto",
                  display: "flex",
                  flexDirection: "row",
                  gap: 3,
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ color: "#757575", fontSize: "30px" }}
                >
                  {user?.userName}
                </Typography>
                <Button
                  sx={{
                    bgcolor: "background.default",
                    color: "text.primary",
                    ":hover": {
                      bgcolor: "#a5d6a7",
                      textDecoration: "underline",
                      textUnderlineOffset: "20px",
                    },
                  }}
                  onClick={logOutHandler}
                >
                  Log Out
                </Button>
              </Stack>
            )}
            {!user && (
              <div>
                <Button
                  sx={{ color: "black", ":hover": { bgcolor: "#a5d6a7" } }}
                >
                  <Link to={"/login"}>Log In</Link>
                </Button>
                <Button
                  sx={{ color: "black", ":hover": { bgcolor: "#a5d6a7" } }}
                >
                  <Link to={"/signup"}>Sign Up</Link>
                </Button>
              </div>
            )}
          </Box>
        ) : (
          !mobileMenu && (
            <IconButton
              onClick={() => setMobileMenu(!mobileMenu)}
              sx={{ ml: "auto" }}
            >
              <MenuIcon sx={{ fontSize: "40px" }} />
            </IconButton>
          )
        )}

        {/* Mobile  */}
        {!isNonMobileScreens && mobileMenu && (
          <Box
            position="fixed"
            right="0"
            bottom="0"
            height="100%"
            zIndex="10"
            maxWidth="500px"
            minWidth="300px"
            backgroundColor="#a5d6a7"
            sx={{ opacity: 0.8 }}
          >
            <Box display="flex" justifyContent="flex-end">
              <IconButton
                onClick={() => setMobileMenu(!mobileMenu)}
                sx={{ ml: "auto" }}
              >
                <CloseIcon sx={{ fontSize: "40px" }} />
              </IconButton>
            </Box>

            {/* Menu Items */}
            {user && (
              <Box display="flex">
                <IconButton sx={{ m: "auto", gap: "2rem" }}>
                  <Avatar sx={{ width: 60, height: 60 }}>
                    {user?.userName.charAt(0)}
                  </Avatar>
                  <Typography sx={{ fontSize: "2rem" }}>
                    {user?.userName}
                  </Typography>
                </IconButton>
              </Box>
            )}

            {user && (
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap="0.5rem"
                sx={{ opacity: 1 }}
              >
                <Tooltip
                  title={
                    mode === "light"
                      ? "Switch to DarkMode"
                      : "Switch to LightMode"
                  }
                >
                  <IconButton
                    onClick={(e) =>
                      setMode(mode === "light" ? "dark" : "light")
                    }
                  >
                    {mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
                  </IconButton>
                </Tooltip>
                {utilities.map((uti, key) => (
                  <Button
                    sx={{
                      width: "100%",
                      color: "#757575",
                      fontSize: "20px",
                      fontWeight: "bold",
                      ":hover": {
                        bgcolor: "#e8f5e9",
                      },
                      gap: "10px",
                    }}
                    onClick={() => {
                      dispatch(setPage(uti.navi));
                    }}
                    key={key}
                  >
                    {uti.icon}
                    {uti.name}
                  </Button>
                ))}
                <Button
                  sx={{
                    width: "100%",
                    color: "#757575",
                    fontSize: "20px",
                    fontWeight: "bold",
                    ":hover": {
                      bgcolor: "#e8f5e9",
                    },
                  }}
                  onClick={logOutHandler}
                >
                  <LogoutIcon />
                  Log Out
                </Button>
              </Box>
            )}
            {!user && (
              <Box>
                <Button
                  sx={{
                    width: "100%",
                    color: "#757575",
                    fontSize: "20px",
                    fontWeight: "bold",
                    ":hover": {
                      bgcolor: "#e8f5e9",
                    },
                  }}
                >
                  <LoginIcon />
                  <Link to={"/login"}>Log In</Link>
                </Button>
                <Button
                  sx={{
                    width: "100%",
                    color: "#757575",
                    fontSize: "20px",
                    fontWeight: "bold",
                    ":hover": {
                      bgcolor: "#e8f5e9",
                    },
                  }}
                >
                  <AppRegistrationIcon />
                  <Link to={"/signup"}>Sign Up</Link>
                </Button>
              </Box>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
