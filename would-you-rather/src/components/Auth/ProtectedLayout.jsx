import { Link, Navigate, useOutlet, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Header from "../Layout/Header";

export const ProtectedLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
    {outlet}
    </>
  );
};
