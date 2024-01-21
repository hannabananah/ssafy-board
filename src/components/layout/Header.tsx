import { Link } from "react-router-dom";
import Logo from "@assets/images/logo.svg";
import { useUserStore } from "@stores/useUserStore";

export default function Header() {
  const { isLogin, user } = useUserStore();

  return (
    <header className="fixed top-0 flex w-full shadow-md h-18 bg-primary-color z-[999]">
      <div className="relative flex justify-between flex-1 w-full max-w-screen-lg px-10 mx-auto shadow-b-md">
        <Link to="/" className="flex justify-start w-40 h-auto">
          <img src={Logo} alt="로고" />
        </Link>
        <nav className="flex items-center justify-end">
          <Link to="/boards" className="px-4 py-8 text-white-color">
            Post
          </Link>
          {isLogin ? (
            <>
              <Link to="/profile" className="px-4 py-8 ml-4 text-white-color">
                {user?.username}
              </Link>
            </>
          ) : (
            <Link to="/login" className="px-4 py-8 ml-4 text-white-color">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
