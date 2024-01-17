import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-primary-light-color">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Error 404</h1>
        <p className="text-lg mb-4">Page not found</p>
        <Link to="/" className="text-primary-dark-color hover:underline">
          메인화면으로 이동하기
        </Link>
      </div>
    </div>
  );
}
