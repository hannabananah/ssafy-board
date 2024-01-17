import { Navigate, Outlet } from "react-router";
import { useLocation } from "react-router-dom";
import { CheckToken } from "../auth/CheckToken";
import { LoadingModal } from "../components/common";

export default function PublicRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const { isAuth } = CheckToken(location.key);

  if (isAuth === "Success") {
    return <Navigate to="/user/login" />;
  } else if (isAuth === "Loading") {
    return <LoadingModal />;
  }

  return <Outlet />;
}
