import { Outlet } from "react-router-dom";
import { Header } from "@layouts/.";
import { ScrollToTopButton } from "@commons/.";

export default function Layout() {
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
