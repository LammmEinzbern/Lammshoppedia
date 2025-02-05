import React from "react";

import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthRouter = () => {
  const localKey = localStorage.getItem("sb-qehdylpssbqwhaiwvzcp-auth-token");

  const loacation = useLocation();
  return localKey ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: loacation }} replace />
  );
};

export default AuthRouter;
