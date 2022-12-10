// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from 'react'
import { isLoggedIn } from "./useToken";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  if (!isLoggedIn()) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute