import { Link } from "react-router-dom";
import LogoIcon from "@assets/images/logo.svg";

export default function Header() {
  return (
    <header className="fixed top-0 flex w-full shadow-md h-18 bg-primary-color z-[999]">
      <div className="relative flex justify-between flex-1 w-full max-w-screen-lg px-10 mx-auto shadow-b-md">
        <Link to="/" className="flex justify-start w-40 h-auto">
          <img src={LogoIcon} alt="로고" />
        </Link>
        <nav className="flex items-center justify-end">
          <Link to="/boards" className="w-10 p-8 text-white-color">
            Post
          </Link>
          <Link to="/profile" className="w-10 p-8 ml-4 text-white-color">
            Profile
          </Link>
          <Link to="/user/login" className="w-10 p-8 ml-4 text-white-color">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
