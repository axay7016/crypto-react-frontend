import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {

  const { isUserHasToken } = useSelector((state) => state.loginSignupReducer.loginSignupVar)
  if (!isUserHasToken) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
}

export default ProtectedRoute