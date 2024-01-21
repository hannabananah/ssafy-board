import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Login,
  Logout,
  Home,
  Profile,
  Board,
  BoardDetail,
  BoardWrite,
  Signup,
  NotFound,
} from "@pages/.";
import { Layout } from "@layouts/.";
import { routes } from "@routes/.";
import axios from "axios";
import { useUserStore } from "@stores/useUserStore";
import { PrivateRoute } from "@routes/.";

function App() {
  const { setIsLogin, setUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios({
          url: "/accessToken",
          method: "GET",
          withCredentials: true,
        });

        if (result.status === 200) {
          setIsLogin(true);
          setUser(result.data);
        }
      } catch (error) {
        console.log("토큰 인증");
        setIsLogin(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setIsLogin, setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={routes.login} element={<Login />} />
          <Route path={routes.signup} element={<Signup />} />

          <Route element={<PrivateRoute />}>
            <Route path={routes.logout} element={<Logout />} />
            <Route path="/" element={<Layout />}>
              <Route path={routes.home} element={<Home />} />
              <Route path={routes.board} element={<Board />} />
              <Route path={routes.boardDetail} element={<BoardDetail />} />
              <Route path={routes.boardWrite} element={<BoardWrite />} />
              <Route
                path={routes.boardEdit}
                element={<BoardWrite editMode />}
              />
              <Route path={routes.profile} element={<Profile />} />
            </Route>
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
