import React, { useState } from "react";
import { FaComments } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
function LoginPage() {
  const [Visiblity, setVisiblity] = useState("false");
  const navigate = useNavigate();
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
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("user login ", response.data);
      toast.success("User Login", {
        transition: Bounce,
        position: "top-center",
        autoClose: 3000,
      });
      navigate("/chat");
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
    <div className="bg-customGreen w-full h-screen flex items-center justify-end">
      <ToastContainer />
      <div className="h-screen flex-1 flex flex-col  items-center">
        <div className="text-center mb-8 mt-20">
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
        <div>
          <img
            className="w-full h-[100%]"
            src="public\Conversation4.gif"
            alt="Conversation animation"
          />
        </div>
      </div>
      <div className="w-7/12 bg-white h-[92%] p-12 rounded-2xl mr-8 flex items-center flex-col ">
        <div className="flex flex-col items-center">
          <div className="mt-4">
            <p className="font-serif text-gray-800 text-2xl">Welcome Back !</p>
          </div>
          <div>
            <p className="text-gray-700 mt-2">Sign in to continue to Chatify</p>
          </div>
        </div>
        <form onSubmit={handlelogin}>
          <div className="flex flex-col mt-14 ">
            <label className="font-poppins mb-2 text-gray-800 ">Username</label>
            <input
              type="text"
              className="h-10 w-96  font-poppins text-gray-900 border-borderColor border-2 p-4 outline-none rounded-sm"
              placeholder="Enter your Username"
              name="userName"
            ></input>
          </div>
          <div className="flex flex-col mt-6 ">
            <label className="font-poppins mb-2 text-gray-800 ">Password</label>
            <div className="flex items-center h-10 w-96 border-2 p-2 rounded-sm border-borderColor">
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
          <div className="mt-6 mr-64">
            <input type="checkbox"></input>
            <label className="font-poppins mb-2 text-gray-800 ml-2 ">
              Remember me
            </label>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="h-10 w-96 bg-customGreen rounded-sm text-white"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-6 flex gap-2">
          <p className="">Don't have an account ?</p>
          <button className="text-customGreen" onClick={handleNavigation}>
            Register
          </button>
        </div>
        <div className="mt-32">
          <p className="text-gray-400">Made with love ❤️ by Keshav raj</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
