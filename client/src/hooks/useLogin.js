import { useState } from "react";
import { useUserContext } from "./useUserContext";
import { setIsAuth } from "../reducers/isAuth";
import { useDispatch } from "react-redux";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch: dispatchUserContext } = useUserContext();
  const dispatch = useDispatch();

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
    console.log("json", json);
    if (!response.ok) {
      setError(json.error);
      setIsLoading(false);
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

  return { login, isLoading, error };
};
