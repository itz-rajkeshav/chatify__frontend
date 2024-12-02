import React from "react";
import { FaComments, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "@/lib/axios";

function RegisterPage() {
  const [visibility, setVisibility] = useState(true);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      gmail: "",
      Name: "",
      userName: "",
      password: "",
      avatar: null,
    },
    validationSchema: Yup.object({
      gmail: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      Name: Yup.string()
        .required("Name is required")
        .min(6, "Name is must of 6 chracters"),
      userName: Yup.string()
        .required("Username is required")
        .min(5, "Username must be of 5 letter"),
      password: Yup.string()
        .min(6, "Password must be 6 characters or more")
        .required("Password must be required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("gmail", values.gmail);
      formData.append("Name", values.Name);
      formData.append("userName", values.userName);
      formData.append("password", values.password);
      formData.append("avatar", values.avatar);
      console.log(formData);

      try {
        const response = await axiosInstance.post("/users/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
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
        });
      }
    },
  });

  const handleVisibility = () => {
    setVisibility(!visibility);
  };

  return (
    <div className="bg-customGreen min-h-screen  flex flex-col lg:flex-row items-center justify-center p-4">
      <ToastContainer />
      <div className=" w-full lg:w-1/2 flex flex-col items-center justify-center px-4 py-8 lg:p-12">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2">
            <FaComments className="text-white text-4xl" />
            <h2 className="text-3xl font-bold font-kosugi text-white">
              Chatify
            </h2>
          </div>
          <p className="mt-3 font-medium font-poppins text-customText text-center">
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
      <div className="w-full lg:w-1/2 bg-white p-6 md:p-12 rounded-2xl  flex flex-col items-center justify-center ">
        <div className="w-full max-w-md space-y-5">
          <div className="flex justify-center ">
            <p className="font-serif text-gray-800 text-2xl ">
              Register Account
            </p>
          </div>
          <div>
            <p className="text-gray-700 flex justify-center ">
              Get your free Chatify account now
            </p>
          </div>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-1 w-full">
            <label className=" block font-poppins  mt-4 text-gray-800 ">
              Email
            </label>
            <input
              type="email"
              className="h-10 w-full font-poppins text-gray-900 border-borderColor border-2  p-4 outline-none rounded-sm"
              placeholder="Enter your email id"
              name="gmail"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.gmail}
            />
            {formik.touched.gmail && formik.errors.gmail ? (
              <div className="text-red-500  mt-1 text-sm">
                {formik.errors.gmail}
              </div>
            ) : null}
          </div>
          <div>
            <label className="block font-poppins mb-1 mt-1 text-gray-800">
              Name
            </label>
            <input
              type="text"
              className="h-10 w-full font-poppins text-gray-900 border-borderColor border-2 p-4 outline-none rounded-sm"
              placeholder="Enter your name"
              name="Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Name}
            />
            {formik.touched.Name && formik.errors.Name ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.Name}
              </div>
            ) : null}
          </div>
          <div>
            <label className=" block font-poppins mb-1 mt-1 text-gray-800 ">
              Username
            </label>
            <input
              type="text"
              className="h-10 w-full font-poppins text-gray-900 border-borderColor border-2 p-4 outline-none rounded-sm"
              placeholder="Enter your username"
              name="userName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userName}
            />
            {formik.touched.userName && formik.errors.userName ? (
              <div className="text-red-500 mt-1  text-sm">
                {formik.errors.userName}
              </div>
            ) : null}
          </div>
          <div>
            <label className=" block font-poppins mb-1 mt-1 text-gray-800 ">
              Password
            </label>
            <div className="flex items-center h-10 w-full border-2  rounded-sm border-borderColor">
              <input
                type={visibility ? "password" : "text"}
                className="w-full px-4 outline-none text-gray-900"
                placeholder="Enter your password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <span
                onClick={handleVisibility}
                className="cursor-pointer text-gray-500 mr-2"
              >
                {visibility ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 mt-1  text-sm">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <div className=" ">
            <label className="block font-poppins mb-1 mt-1 text-gray-800 ">
              Profile Photo
            </label>
            <input
              type="file"
              name="avatar"
              className="w-full"
              onChange={(event) => {
                formik.setFieldValue("avatar", event.target.files[0]);
              }}
            />
          </div>
          <div className="">
            <button
              type="submit"
              className="h-10 w-full mt-2 bg-customGreen rounded-sm text-white hover:opacity-90 transition-opacity"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="inline-block mr-2">Already have an account?</p>
          <button
            className="text-customGreen hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
        <div className="text-center mt-6">
          <p className="text-gray-400">Made with love ❤️ by Keshav Raj</p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
