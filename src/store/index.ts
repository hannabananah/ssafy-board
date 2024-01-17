import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "@stores/Auth";

export default configureStore({
  reducer: {
    authToken: tokenReducer,
  },
});
