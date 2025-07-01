import { useLocation, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  // check Login state：if login success, save Token in the localStorage
  const isLoggedIn = localStorage.getItem("token"); 
  const location = useLocation();

  // if unlogin, turn to login with current path
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return null;
};

export default ProtectedRoute;