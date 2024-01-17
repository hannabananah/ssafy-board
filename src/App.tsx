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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={routes.logout} element={<Logout />} />
          <Route path="/" element={<Layout />}>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.board} element={<Board />} />
            <Route path={routes.boardDetail} element={<BoardDetail />} />
            <Route path={routes.boardWrite} element={<BoardWrite />} />
            <Route path={routes.boardEdit} element={<BoardWrite editMode />} />
          </Route>
          <Route path={routes.profile} element={<Profile />} />
          <Route path={routes.login} element={<Login />} />
          <Route path={routes.signup} element={<Signup />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
