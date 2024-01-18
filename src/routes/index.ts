import PrivateRoute from "@routes/PrivateRoute";
import PublicRoute from "@routes/PublicRoute";

const routes = {
  home: "/",
  login: "/login",
  signup: "/signup",
  logout: "/logout",
  profile: "/profile",
  board: "/boards",
  boardDetail: "/boards/:id",
  boardWrite: "/boards/write",
  boardEdit: "/boards/:id/edit",
};

export { routes, PrivateRoute, PublicRoute };
