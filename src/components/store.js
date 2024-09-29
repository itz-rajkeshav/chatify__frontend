import { configureStore } from "@reduxjs/toolkit";
// import SignupReducer from "./UserSlice";
import UserReducer from "./UserSlice";
export const store = configureStore({
  reducer: {
    User: UserReducer,
  },
});
