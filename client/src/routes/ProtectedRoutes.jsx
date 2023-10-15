import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function ProtectedRoutes({ children }) {
  const location = useLocation();
  const token = localStorage.getItem("userinfo");

  if (!token) {
    toast.error("pls login");
    return <Navigate to={"/"} state={{ from: location }} replace />;
  }

  return children;
}
