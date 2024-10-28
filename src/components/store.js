import { configureStore } from "@reduxjs/toolkit";
import UserReducer_2 from "./UserSlice2";

// import SignupReducer from "./UserSlice";
import UserReducer from "./UserSlice";
export const store = configureStore({
  reducer: {
    User: UserReducer,
    user_2: UserReducer_2,
  },
});
