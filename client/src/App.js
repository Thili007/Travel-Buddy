import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useUserContext } from "./hooks/useUserContext";
import "./App.css";
import { NavBar } from "./components/Navbar/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const App = () => {
  const mode = useSelector((state) => state.changeMode.mode);

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const { user } = useUserContext();
  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <BrowserRouter>
          <CssBaseline />
          <Box sx={{ mt: "5rem" }}>
            <Routes>
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/signup"
                element={!user ? <Signup /> : <Navigate to="/" />}
              />

              {/* After Login Routes */}
              <Route
                path="/"
                element={user ? <Home /> : <Navigate to="/login" />}
              />
            </Routes>
          </Box>
        </BrowserRouter>
      </Box>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
