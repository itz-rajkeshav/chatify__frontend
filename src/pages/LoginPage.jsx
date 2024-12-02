import React, { useState } from "react";
import { FaComments } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setName, setEmail, setuserName } from "../components/UserSlice.js";
import axiosInstance from "@/lib/axios.js";
function LoginPage() {
  const [Visiblity, setVisiblity] = useState("false");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleVisibility = () => {
    setVisiblity(!Visiblity);
  };
  const handleNavigation = () => {
    navigate("/register");
  };
  const handlelogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // Convert FormData to an object
    const dataObject = {};
    formData.forEach((value, key) => {
      dataObject[key] = value;
    });

    // Convert the object to JSON
    const jsonData = JSON.stringify(dataObject);
    try {
      const response = await axiosInstance.post("/users/login", jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log(response);
      // console.log("user login ", response.data);
      const token = response.data.data.accessToken;
      localStorage.setItem("accessToken", token);
      // console.log(token);
      // localStorage.getItem("accessToken", "token");
      // console.log(localStorage);
      console.log(response.data.data.user.Name);
      if (response.data && response.data.data && response.data.data.user) {
        const user_Name = response.data.data.user.Name;
        const user_email = response.data.data.user.gmail;
        const user_userName = response.data.data.user.userName;
        dispatch(setName(user_Name));
        dispatch(setEmail(user_email));
        dispatch(setuserName(user_userName));
        toast.success("User Login", {
          transition: Bounce,
          position: "top-center",
          autoClose: 3000,
        });
        navigate("/chat");
      } else {
        toast.error("Login successful, but user data is missing", {
          transition: Bounce,
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        transition: Bounce,
        position: "top-center",
        autoClose: 3000,
      });
    }
  };
  return (
    <div className="bg-customGreen min-h-screen flex flex-col lg:flex-row items-center justify-center">
      <ToastContainer />
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-4 py-8 lg:p-12">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2">
            <FaComments className="text-white text-4xl" />
            <h2 className="text-3xl font-bold font-kosugi text-white">
              Chatify
            </h2>
          </div>
          <p className="mt-3 font-medium font-poppins text-customText">
            Simple chats, real connections
          </p>
        </div>
        <div className="max-w-md w-full">
          <img
            className="w-full h-auto"
            src="Conversation4.gif"
            alt="Conversation animation"
          />
        </div>
      </div>
      <div className="w-full lg:w-1/2 bg-white p-6 md:p-12  md:mr-2 rounded-2xl flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-8">
            <div>
              <p className="font-serif text-gray-800 text-2xl text-center">
                Welcome Back !
              </p>
            </div>
            <div>
              <p className="text-gray-700 mt-2 text-center">
                Sign in to continue to Chatify
              </p>
            </div>
          </div>

          <form onSubmit={handlelogin} className="w-full">
            <div className="flex flex-col mb-4">
              <label className="font-poppins mb-2 text-gray-800">
                Username
              </label>
              <input
                type="text"
                className="h-10 w-full font-poppins text-gray-900 border-borderColor border-2 p-4 outline-none rounded-sm"
                placeholder="Enter your Username"
                name="userName"
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="font-poppins mb-2 text-gray-800">
                Password
              </label>
              <div className="flex items-center h-10 w-full border-2 p-2 rounded-sm border-borderColor">
                <input
                  type={Visiblity ? "password" : "text"}
                  className="w-full outline-none text-gray-900"
                  placeholder="Enter your password"
                  name="password"
                />
                <span
                  onClick={handleVisibility}
                  className="cursor-pointer text-gray-500 ml-2"
                >
                  {Visiblity ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <div className="mb-4 flex items-center">
              <input type="checkbox" className="mr-2" />
              <label className="font-poppins text-gray-800">Remember me</label>
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="h-10 w-full bg-customGreen rounded-sm text-white hover:opacity-90 transition-opacity"
              >
                Login
              </button>
            </div>
          </form>

          <div className="text-center">
            <div className="mb-4 flex justify-center gap-2">
              <p>Don't have an account?</p>
              <button
                className="text-customGreen hover:underline"
                onClick={handleNavigation}
              >
                Register
              </button>
            </div>

            <div>
              <p className="text-gray-400">Made with love ❤️ by Keshav raj</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
