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
    <div className="bg-customGreen w-full h-screen flex items-center justify-end">
      <ToastContainer />
      <div className="h-screen flex-1 flex flex-col items-center">
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
            src="public/Conversation4.gif"
            alt="Conversation animation"
          />
        </div>
      </div>
      <div className="w-7/12 bg-white h-[92%] p-8 rounded-2xl mr-8 flex items-center flex-col">
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
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col mt-2 ">
            <label className="font-poppins mb-2 text-gray-800 ">Email</label>
            <input
              type="email"
              className="h-10 w-96 font-poppins text-gray-900 border-borderColor border-2 p-4 outline-none rounded-sm"
              placeholder="Enter your email id"
              name="gmail"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.gmail}
            />
            {formik.touched.gmail && formik.errors.gmail ? (
              <div className="text-red-500 absolute top-48 mt-3 text-sm">
                {formik.errors.gmail}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col mt-3 ">
            <label className="font-poppins mb-2 text-gray-800 ">Name</label>
            <input
              type="text"
              className="h-10 w-96 font-poppins text-gray-900 border-borderColor border-2 p-4 outline-none rounded-sm"
              placeholder="Enter your name"
              name="Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Name}
            />
            {formik.touched.Name && formik.errors.Name ? (
              <div className="text-red-500 text-sm absolute top-72 mb-5">
                {formik.errors.Name}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col mt-3 ">
            <label className="font-poppins mb-2 text-gray-800 ">Username</label>
            <input
              type="text"
              className="h-10 w-96 font-poppins text-gray-900 border-borderColor border-2 p-4 outline-none rounded-sm"
              placeholder="Enter your username"
              name="userName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userName}
            />
            {formik.touched.userName && formik.errors.userName ? (
              <div className="text-red-500 absolute top-80 mt-12 pt-1 text-sm">
                {formik.errors.userName}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col mt-3 ">
            <label className="font-poppins mb-2 text-gray-800 ">Password</label>
            <div className="flex items-center h-10 w-96 border-2 p-2 pl-4 rounded-sm border-borderColor">
              <input
                type={visibility ? "password" : "text"}
                className="w-full outline-none text-gray-900"
                placeholder="Enter your password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <span
                onClick={handleVisibility}
                className="cursor-pointer text-gray-500 ml-2"
              >
                {visibility ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 absolute  top-88 mt-16 pt-2  text-sm">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col mt-4 mr-20 ">
            <label className="font-poppins mb-2 text-gray-800 ">
              Profile Photo
            </label>
            <input
              type="file"
              name="avatar"
              onChange={(event) => {
                formik.setFieldValue("avatar", event.target.files[0]);
              }}
            />
          </div>
          <div className="mt-5">
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
          <button
            className="text-customGreen"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
        <div className="mt-6">
          <p className="text-gray-400">Made with love ❤️ by Keshav Raj</p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
