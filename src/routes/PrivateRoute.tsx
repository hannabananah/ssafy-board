import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "@stores/useUserStore";

export default function PrivateRoute() {
  const { isLogin } = useUserStore();

  if (isLogin) {
    // 인증이 반드시 필요한 페이지
    return <Outlet />;
  }
  // 미로그인 유저가 이동할 곳
  return <Navigate replace to="/main" />;
}
