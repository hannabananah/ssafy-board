import { useState, useEffect } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";

export default function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    setShowButton(
      document.body.scrollTop > 20 || document.documentElement.scrollTop > 20
    );
  };

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 로그인 페이지에서는 안보이도록
  if (window.location.pathname === "/login") return null;
  return (
    <>
      {showButton && (
        <button
          type="button"
          onClick={backToTop}
          className={` ${
            showButton ? `inline-block` : `hidden`
          } fixed bottom-[25px] right-[40px] w-[30px] h-[30px] bg-white-color rounded-full drop-shadow-xl hover:drop-shadow-2xl smooth-color`}
        >
          <FaArrowAltCircleUp fill="#333" size={30} />
        </button>
      )}
    </>
  );
}
