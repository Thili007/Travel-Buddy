import { useState } from "react";
import { useUserContext } from "./useUserContext";
import { useDispatch } from "react-redux";
import { setUserData } from "../reducers/userSetup";

export const useLogin = () => {
  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useUserContext();

  // Redux parts
  const userSetupDispatch = useDispatch();

  const login = async (userName, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:4000/api/user/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    });
    const json = await response.json();

    const user_id = json.userDetails._id;

    if (!response.ok) {
      setError(json.error);
      setIsLoading(false);
    }

    if (response.ok) {
      localStorage.setItem("USER_DETAILS", JSON.stringify(json.userDetails));
      localStorage.setItem("TOKEN", JSON.stringify(json.token));
      localStorage.setItem("USER_ID", JSON.stringify(json.userDetails._id));

      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);

      // redux parts
      userSetupDispatch(
        setUserData({
          user_id: user_id,
          token: localStorage.getItem("TOKEN"),
        })
      );
    }
  };

  return { login, isLoading, error };
};
