import React from "react";
import { useSelector } from "react-redux";
import NotFoundPage from "../../pages/NotFoundPage";

const ProtectedRoutes = ({ element }) => {
    const {isAuth} = useSelector((state) => state.users.isAuth);
    const RouteComponent = () => (
        isAuth
            ? element
            : <NotFoundPage />
    );
    return <RouteComponent />;

}

export default ProtectedRoutes;