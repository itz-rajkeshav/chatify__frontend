import { React, useState } from "react";
import { FaComments } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function RegisterPage() {
  const [Visiblity, setVisiblity] = useState("false");
  const navigate = useNavigate();
  const handleVisibility = () => {
    setVisiblity(!Visiblity);
  };
  const handleForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("user registered", response.data);
      toast.success("User Registered 🙂", {
        transition: Bounce,
        position: "top-center",
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong 😑", {
        transition: Bounce,
        position: "top-center",
        autoClose: 3000,
        // theme: "",
      });
    }
  };
  const handleNavigation = () => {
    navigate("/login");
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
          <div className="">
            <p className="font-serif text-gray-800 text-2xl">
              Register Account
            </p>
          </div>
          <div>
            <p className="text-gray-700 mt-2">
              Get your free Chatify account now
            </p>
          </div>
        </div>
        <form onSubmit={handleForm}>
          <div className="flex flex-col mt-2 ">
            <label className="font-poppins mb-2 text-gray-800 ">Email</label>
            <input
              type="email"
              className="h-10 w-96  font-poppins text-gray-900 border-borderColor border-2 p-4 outline-none rounded-sm"
              placeholder="Enter your email id"
              name="gmail"
            ></input>
          </div>
          <div className="flex flex-col mt-2 ">
            <label className="font-poppins mb-2 text-gray-800 ">Name</label>
            <input
              type="text"
              className="h-10 w-96  font-poppins text-gray-900 border-borderColor border-2 p-4 outline-none rounded-sm"
              placeholder="Enter your name"
              name="Name"
            ></input>
          </div>
          <div className="flex flex-col mt-2 ">
            <label className="font-poppins mb-2 text-gray-800 ">Username</label>
            <input
              type="text"
              className="h-10 w-96  font-poppins text-gray-900 border-borderColor border-2 p-4 outline-none rounded-sm"
              placeholder="Enter your username"
              name="userName"
            ></input>
          </div>
          <div className="flex flex-col mt-2 ">
            <label className="font-poppins mb-2 text-gray-800 ">Password</label>
            <div className="flex items-center h-10 w-96 border-2 p-2 pl-4 rounded-sm border-borderColor">
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
          <div className="flex flex-col mt-4 mr-20 ">
            <label className="font-poppins mb-2 text-gray-800 ">
              Profile Photo
            </label>
            <input type="file" name="avatar" placeholder="Photo"></input>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="h-10 w-96 bg-customGreen rounded-sm text-white"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="mt-4 flex gap-2">
          <p className="">Already have an account?</p>
          <button className="text-customGreen" onClick={handleNavigation}>
            Login
          </button>
        </div>
        <div className="mt-6">
          <p className="text-gray-400">Made with love ❤️ by Keshav raj</p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
