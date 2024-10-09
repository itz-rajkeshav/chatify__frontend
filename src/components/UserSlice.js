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
    setprofilePic: (state, action) => {
      state.profilePic = action.payload;
    },
    setisSignup: (state) => {
      state.isSignup = true;
    },
  },
});

export const { setName, setEmail, setuserName, setprofilePic, setisSignup } =
  UserSlice.actions;
export default UserSlice.reducer;
