import { useState } from "react";
import { useNavigate } from "react-router";

import axios from "axios";
import { useUserStore } from "@stores/useUserStore";
import { useLoginForm } from "@hooks/.";

export default function Login() {
  const navigate = useNavigate();

  const [userid, setUserId, onChangeId] = useLoginForm();
  const [password, setPw, onChangePw] = useLoginForm();
  const { setIsLogin, setUser } = useUserStore();
  const [isInputValid, setIsInputValid] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleInputValidation = () => {
    setIsInputValid(userid.length > 0 && password.length > 0);
  };

  const handleClickSignIn = () => {
    axios({
      url: "/login",
      method: "POST",
      withCredentials: true,
      data: {
        userid: userid,
        password: password,
      },
    })
      .then((result) => {
        if (result.status === 200) {
          const userData = result.data;

          setIsLogin(true);
          setUser(userData);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        setLoginError("로그인에 실패했습니다. 다시 시도해주세요.");
      });
  };

  const handleClickSignUp = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <div className="flex justify-center h-screen">
      <div className="w-[360px] p-8 m-auto bg-opacity-50 h-[380px] bg-white-color rounded-xl backdrop-filter backdrop-blur-lg">
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-10">
            <span className="text-4xl font-extrabold text-center text-black-color">
              Login
            </span>
            <form>
              <div className="flex flex-row justify-between gap-2">
                <div className="flex flex-col w-full gap-4">
                  <input
                    type="userid"
                    placeholder="아이디"
                    className="w-full h-10 p-2 border rounded border-light-gray-color"
                    onChange={(e) => {
                      onChangeId(e);
                      handleInputValidation();
                    }}
                    value={userid}
                  />
                  <input
                    type="password"
                    placeholder="비밀번호"
                    className="w-full h-10 p-2 border rounded border-light-gray-color"
                    onChange={(e) => {
                      onChangePw(e);
                      handleInputValidation();
                    }}
                    value={password}
                  />
                </div>
                <button
                  type="button"
                  className={`w-24 p-2 rounded cursor-pointer ${
                    isInputValid
                      ? "bg-primary-color text-white-color"
                      : "bg-primary-light-color text-white-color hover:bg-primary-color"
                  }`}
                  onClick={handleClickSignIn}
                >
                  로그인
                </button>
              </div>
            </form>
            {loginError && (
              <div className="text-sm text-red-500">{loginError}</div>
            )}
          </div>
          <button
            onClick={handleClickSignUp}
            className="w-full p-2 rounded cursor-pointer bg-white-color text-black-color hover:bg-light-gray-color"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
