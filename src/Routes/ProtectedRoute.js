import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, token }) => {
  if (!token) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};