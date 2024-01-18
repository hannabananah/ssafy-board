import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "@assets/images/logo.svg";
import { useUserStore } from "@stores/useUserStore";

export default function Header() {
  const { isLogin, user } = useUserStore();
  const [loginContent, setLoginContent] = useState(
    <Link to="/login" className="w-10 p-8 ml-4 text-white-color">
      Login
    </Link>
  );
  console.log("isLogin", isLogin);
  useEffect(() => {
    if (isLogin) {
      setLoginContent(
        <h3 className="w-10 p-8 ml-4 text-white-color">{user?.username}</h3>
      );
    } else {
      setLoginContent(
        <Link to="/login" className="w-10 p-8 ml-4 text-white-color">
          Login
        </Link>
      );
    }
  }, [isLogin, user]);

  return (
    <header className="fixed top-0 flex w-full shadow-md h-18 bg-primary-color z-[999]">
      <div className="relative flex justify-between flex-1 w-full max-w-screen-lg px-10 mx-auto shadow-b-md">
        <Link to="/" className="flex justify-start w-40 h-auto">
          <img src={Logo} alt="로고" />
        </Link>
        <nav className="flex items-center justify-end">
          <Link to="/boards" className="w-10 p-8 text-white-color">
            Post
          </Link>
          <Link to="/profile" className="w-10 p-8 ml-4 text-white-color">
            Profile
          </Link>
          {loginContent}
        </nav>
      </div>
    </header>
  );
}
