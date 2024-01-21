import PrivateRoute from "@routes/PrivateRoute";

const routes = {
  home: "/main",
  login: "/",
  signup: "/signup",
  logout: "/logout",
  profile: "/profile",
  board: "/boards",
  boardDetail: "/boards/:id",
  boardWrite: "/boards/write",
  boardEdit: "/boards/:id/edit",
};

export { PrivateRoute, routes };
