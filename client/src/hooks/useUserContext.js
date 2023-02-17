import { UserContext } from "../context/UserContext";
import { useContext } from "react";

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw Error("userContext must be use in inside UserContextProvider");
  }
  return context;
};
