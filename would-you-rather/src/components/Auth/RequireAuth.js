import React, {useState} from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


const RequireAuth = ({ children }) => {
    const users = useSelector((state) => state.users);
    const location = useLocation();
    return users.receiveUser ? children : <Navigate to='/login' replace state={{ path: location.pathname }}/>;
}

export default RequireAuth;

