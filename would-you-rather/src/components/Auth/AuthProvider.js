import React from "react";
import { useSelector } from "react-redux";
import { createContext } from "react";
const authContext = createContext();


export function AuthProvider({ children }) {
    const users = useSelector((state) => state.users);
  
    return <authContext.Provider value={users.receiveUser}>{children}</authContext.Provider>;
  }
  
  export default function AuthConsumer() {
    return React.useContext(authContext);
  }