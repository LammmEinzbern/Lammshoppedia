import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedAuth = () => {
  const localKey = localStorage.getItem("sb-qehdylpssbqwhaiwvzcp-auth-token");

  const location = useLocation();

  return localKey ? (
    <Navigate to={"/"} state={{ from: location }} />
  ) : (
    <Outlet />
  );
};

export default ProtectedAuth;
