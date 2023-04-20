import { useState } from "react";
import { useUserContext } from "./useUserContext";
import { useDispatch } from "react-redux";
import { setIsAuth } from "../reducers/isAuth";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch: dispatchUserContext } = useUserContext();
  const dispatch = useDispatch();

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

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      localStorage.setItem("USER_DETAILS", JSON.stringify(json.userDetails));
      localStorage.setItem("TOKEN", JSON.stringify(json.token));
      localStorage.setItem("USER_ID", JSON.stringify(json.userDetails._id));
      dispatch(setIsAuth(true));

      dispatchUserContext({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };
  return { signUp, isLoading, error };
};
