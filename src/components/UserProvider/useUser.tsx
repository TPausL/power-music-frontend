import { useContext } from "react";
import { UserContext, UserContextType } from "./UserProvider";

export default function useUser() {
  return useContext<UserContextType>(UserContext);
}
