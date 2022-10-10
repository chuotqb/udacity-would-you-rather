import React, {useState} from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { useSelector } from "react-redux";
import { createContext } from "react";

const authContext = React.createContext();

const RequireAuth = ({ children }) => {
    const users = useSelector((state) => state.users);
    const location = useLocation();
    return users.receiveUser ? children : <Navigate to='/login' replace state={{ path: location.pathname }}/>;
}

export default RequireAuth;