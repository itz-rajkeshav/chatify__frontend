import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  email: "",
  name: "",
  userName: "",
  isSignup: "",
  password: "",
  profilePic: "",
  coverImage:"",
  Id: "",
};
const UserSlice = createSlice({
  name: "user_2",
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
    setcoverImage:(state,action)=>{
      state.coverImage=action.payload;
    },
    setisSignup: (state) => {
      state.isSignup = true;
    },
    setId: (state, action) => {
      state.Id = action.payload;
    },
  },
});

export const {
  setName,
  setEmail,
  setuserName,
  setprofilePic,
  setisSignup,
  setId,
  setcoverImage,
} = UserSlice.actions;
export default UserSlice.reducer;
