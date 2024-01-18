import { useState } from "react";
import { useNavigate } from "react-router";

import axios from "axios";

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

interface LoginProps {
  setUser: (user: User) => void;
  setIsLogin: (isLogin: boolean) => void;
}

export default function Login({ setUser, setIsLogin }: LoginProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClickSignIn = () => {
    axios({
      url: "/login",
      method: "POST",
      withCredentials: true,
      data: {
        email: email,
        password: password,
      },
    })
      .then((result) => {
        if (result.status === 200) {
          window.open("/", "_self");
          setIsLogin(true);
          setUser(result.data);
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
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
      <div className="w-[360px] p-8 m-auto bg-opacity-40 hover:bg-opacity-50 h-[420px] bg-white-color rounded-xl backdrop-filter backdrop-blur-lg">
        <form className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-10">
            <span className="text-4xl font-extrabold text-center text-black-color">
              Login
            </span>
            <div className="flex flex-col gap-6">
              <div className="h-10">
                <input
                  type="email"
                  placeholder="아이디"
                  className="w-full p-2 border rounded border-light-gray-color"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="h-10">
                <input
                  type="password"
                  placeholder="비밀번호"
                  className="w-full p-2 border rounded border-light-gray-color"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              className="w-full p-2 rounded cursor-pointer bg-primary-light-color text-white-color hover:bg-primary-color"
              onClick={handleClickSignIn}
            >
              로그인
            </button>
            <button
              onClick={handleClickSignUp}
              className="w-full p-2 rounded cursor-pointer bg-white-color text-black-color hover:bg-light-gray-color"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
