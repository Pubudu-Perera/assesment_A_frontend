import { useContext } from "react";
import AuthContext from "../context/AuthContextProvider";

// this is a custom hook that simplyfies user authentication context
const useAuth = () => {
  return useContext(AuthContext);
}

export default useAuth