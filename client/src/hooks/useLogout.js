import { useUserContext } from "./useUserContext";

export const useLogout = () => {
  const { dispatch } = useUserContext();

  const logout = () => {
    localStorage.removeItem("USER_DETAILS");
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("USER_ID");

    dispatch({ type: "LOGOUT" });
  };
  return { logout };
};
