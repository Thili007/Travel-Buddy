import { useState } from "react";
import { useUserContext } from "./useUserContext";
import { useDispatch } from "react-redux";
import { setUserData } from "../reducers/userSetup";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useUserContext();

  // Redux parts

  const userSetupDispatch = useDispatch();

  const signUp = async (userName, email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:4000/api/user/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userName, email, password }),
    });
    const json = await response.json();

    const user_id = json.userDetails._id;

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      localStorage.setItem("USER_DETAILS", JSON.stringify(json.userDetails));
      localStorage.setItem("TOKEN", JSON.stringify(json.token));

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
  return { signUp, isLoading, error };
};
