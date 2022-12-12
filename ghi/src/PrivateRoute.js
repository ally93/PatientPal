// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from "react";
import { getToken } from "./useToken";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = getToken();
  if (token) {
    return children;
  } else {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
