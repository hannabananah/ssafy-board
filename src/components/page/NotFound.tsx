import { Link } from "react-router-dom";
import { useUserStore } from "@stores/useUserStore";

export default function NotFound() {
  const { isLogin } = useUserStore();

  return (
    <div className="flex items-center justify-center h-screen bg-primary-light-color">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Error 404</h1>
        <p className="mb-4 text-lg">Page not found</p>

        {isLogin ? (
          <>
            <Link
              to="/main"
              className="text-primary-dark-color hover:underline"
            >
              메인화면으로 이동하기
            </Link>
          </>
        ) : (
          <Link to="/" className="text-primary-dark-color hover:underline">
            로그인페이지로 이동하기
          </Link>
        )}
      </div>
    </div>
  );
}
