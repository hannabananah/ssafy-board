import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getCookieToken, removeCookieToken } from "@storage/Cookie";
import { DELETE_TOKEN } from "@stores/Auth";
import { logoutUser } from "@apis/Users";

interface RootState {
  token: {
    accessToken: string;
  };
}

export default function Logout() {
  // store에 저장된 Access Token 정보를 받아 온다
  const { accessToken } = useSelector((state: RootState) => state.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Cookie에 저장된 Refresh Token 정보를 받아 온다
  const refreshToken = getCookieToken();

  async function logout() {
    // 백으로부터 받은 응답
    const data = await logoutUser({ refresh_token: refreshToken }, accessToken);

    if (data.status) {
      // store에 저장된 Access Token 정보를 삭제
      dispatch(DELETE_TOKEN());
      // Cookie에 저장된 Refresh Token 정보를 삭제
      removeCookieToken();
      navigate("/main");
    } else {
      window.location.reload();
    }
  }

  // 해당 컴포넌트가 요청된 후 한 번만 실행되면 되기 때문에 useEffect 훅을 사용
  useEffect(() => {
    logout();
  }, []);

  return (
    <>
      <Link to="/main" />
    </>
  );
}
