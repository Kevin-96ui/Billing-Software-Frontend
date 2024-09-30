import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children, allowedAdminTypes = [] }) => {
  // Get the token from cookies
  const token = Cookies.get("token");
  
  // Get the userType from localStorage and parse it as an integer
  const userType = parseInt(localStorage.getItem("Type"), 10);

  // Check if the token is not present
  if (!token) {
    return <Navigate to="/landingpage" />;
  }

  // Check if allowedAdminTypes is defined and userType is included
  if (!allowedAdminTypes.includes(userType)) {
    return <Navigate to="/not-allowed" />;
  }

  // If both checks pass, render the children components
  return children;
};

export default ProtectedRoute;
