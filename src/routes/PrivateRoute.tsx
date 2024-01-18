import { Outlet, Navigate } from "react-router";
import { useLocation } from "react-router-dom";

import { CheckToken } from "@auth/CheckToken";
import { LoadingModal } from "@commons/.";

export default function PrivateRoute() {
  const location = useLocation();
  const { isAuth } = CheckToken(location.key);

  if (isAuth === "Failed") {
    return <Navigate to="/login" state={{ from: location }} />;
  } else if (isAuth === "Loading") {
    return <LoadingModal />;
  }

  return <Outlet />;
}
