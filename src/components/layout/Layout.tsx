import { Outlet } from "react-router-dom";
import { Header } from "@layouts/.";
import { ScrollToTopButton } from "@commons/.";
// import { useEffect } from "react";
// import { fetchLoginUser } from "@/api/user";
// import useAuthStore from "@/store/userStore";

export default function Layout() {
  // const { setLoginUser } = useAuthStore((state) => state);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await fetchLoginUser();
  //       if (data) {
  //         setLoginUser(data);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   fetchData();
  // }, [setLoginUser]);

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header />
      <div className="w-full h-[calc(100%-88px)] m-[88px] px-10 max-w-screen-lg relative justify-self-center">
        <Outlet />
        <ScrollToTopButton />
      </div>
    </div>
  );
}
