import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  email: "",
  name: "",
  userName: "",
  isSignup: "",
  password: "",
  profilePic: "",
};
const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setuserName: (state, action) => {
      state.userName = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setisSignup: (state) => {
      state.isSignup = true;
    },
  },
});

export const { setName, setEmail, setuserName, setPassword, setisSignup } =
  UserSlice.actions;
export default UserSlice.reducer;
