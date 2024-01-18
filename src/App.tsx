import { useEffect, useState } from "react";
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
import { routes, PrivateRoute, PublicRoute } from "@routes/.";
import axios from "axios";
import { useUserStore } from "@stores/useUserStore";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});

  const accessToken = () => {
    axios({
      url: "/accesstoken",
      method: "GET",
      withCredentials: true,
    });
  };

  const refreshToken = () => {
    axios({
      url: "/refreshtoken",
      method: "GET",
      withCredentials: true,
    });
  };

  useEffect(() => {
    try {
      axios({
        url: "/login/success",
        method: "GET",
        withCredentials: true,
      })
        .then((result) => {
          if (result.data[0]) {
            setIsLogin(true);
            setUser(result.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route element={<PrivateRoute />}> */}
          <Route path={routes.logout} element={<Logout />} />
          <Route path="/" element={<Layout />}>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.board} element={<Board />} />
            <Route path={routes.boardDetail} element={<BoardDetail />} />
            <Route path={routes.boardWrite} element={<BoardWrite />} />
            <Route path={routes.boardEdit} element={<BoardWrite editMode />} />
          </Route>
          <Route path={routes.profile} element={<Profile />} />
          {/* </Route> */}

          <Route
            path={routes.login}
            element={
              // <PublicRoute>
              <Login setUser={setUser} setIsLogin={setIsLogin} />
              // </PublicRoute>
            }
          />

          <Route
            path={routes.signup}
            element={
              // <PublicRoute>
              <Signup />
              // </PublicRoute>
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
