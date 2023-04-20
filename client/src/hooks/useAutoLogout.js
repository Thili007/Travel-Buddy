import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useLogout } from "./useLogout";

export const useAutoLogout = (token) => {
  const { logout } = useLogout();
  const navigate = useNavigate();
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const isTokenExpired = (token) => {
    const decodedToken = jwt_decode(token);

    const now = Date.now() / 1000; // convert to seconds
    return decodedToken.exp < now;
  };

  console.log("isLoggedOut", isLoggedOut);

  useEffect(() => {
    let interval;

    if (token) {
      interval = setInterval(() => {
        if (isTokenExpired(token)) {
          setIsLoggedOut(true);
          logout();
          navigate("/", { replace: true });
        }
      }, 100000);
    }

    return () => clearInterval(interval);
  }, [navigate, logout, token]);

  return isLoggedOut;
};
