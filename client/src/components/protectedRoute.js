import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import auth from "./auth";

const ProtectedRoute = (route) => {
  auth.setRoute(route);
  return auth.isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
