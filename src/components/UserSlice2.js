import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  email_2: "",
  name_2: "",
  userName_2: "",
  isSignup_2: "",
  password_2: "",
  profilePic_2: "",
  Id_2: "",
};
const UserSlice_2 = createSlice({
  name: "user_2",
  initialState,
  reducers: {
    setEmail_2: (state, action) => {
      state.email_2 = action.payload;
    },
    setName_2: (state, action) => {
      state.name_2 = action.payload;
    },
    setuserName_2: (state, action) => {
      state.userName_2 = action.payload;
    },
    setprofilePic_2: (state, action) => {
      state.profilePic_2 = action.payload;
    },
    setisSignup_2: (state) => {
      state.isSignup_2 = true;
    },
    setId_2: (state, action) => {
      state.Id_2 = action.payload;
    },
  },
});

export const {
  setName_2,
  setEmail_2,
  setuserName_2,
  setprofilePic_2,
  setisSignup_2,
  setId_2,
} = UserSlice_2.actions;
export default UserSlice_2.reducer;
