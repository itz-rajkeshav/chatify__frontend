import React, { useState } from "react";
import { FaCamera, FaUser, FaPencilAlt, FaSave } from "react-icons/fa";
import StatusSelect from "./StatusSelect";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import axiosInstance from "@/lib/axios";

function Setting() {
  const [ShowIcon, setShowIcon] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [location, setLocation] = useState("Your location");
  const navigate = useNavigate();
  const { email, name, userName, profilePic } = useSelector((state) => {
    return state.User;
  });
  const handleSave = () => {
    setShowIcon(!ShowIcon);
    setIsEditing(!isEditing);
  };
  const handleLogout = async () => {
    localStorage.removeItem("accessToken", "");
    console.log(localStorage);
    navigate("/login");
    try {
      const response = await axiosInstance.post("/users/logout");
      console.log("user logout successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const handleBackgroundChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBackgroundImage(imageUrl);
    }
  };

  const handleProfileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };
  console.log(userName);

  return (
    <>
      <TooltipProvider>
        <div className="w-80 h-screen bg-white-100  shadow-lg">
          <div
            className="w-80 h-40 bg-customGreen relative"
            style={{
              backgroundImage: backgroundImage ? `url(${backgroundImage})` : "",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="flex justify-between items-center absolute top-4 w-full px-6">
              <div className="text-xl ml-3 font-kosugi text-white ">
                <p>Settings</p>
              </div>
              {ShowIcon && (
                <Tooltip>
                  <div>
                    <TooltipTrigger asChild>
                      <label className="text-white cursor-pointer shadow-lg hover:text-gray-700">
                        <FaCamera />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleBackgroundChange}
                          className="hidden"
                        />
                      </label>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black text-sm text-white p-1 rounded shadow-lg">
                      Change Cover Pic
                    </TooltipContent>
                  </div>
                </Tooltip>
              )}
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-35px]">
              <div className="relative w-20 h-20 rounded-full border-4 border-white">
                <div className="overflow-hidden w-full h-full rounded-full">
                  <img
                    src={
                      profilePic
                        ? profilePic
                        : "https://via.placeholder.com/100"
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                {ShowIcon && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <label className="absolute bottom-3 left-10 translate-x-1/2 translate-y-1/2 p-1 bg-gray-600 rounded-full text-white cursor-pointer">
                        <FaCamera />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleProfileChange}
                          className="hidden"
                        />
                      </label>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black text-sm  text-white p-1 rounded shadow-lg">
                      Change Profile Pic
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-14">
            <StatusSelect />
          </div>

          <div className="text-gray-300">
            <p>________________________________________________</p>
          </div>

          <div className="text-gray-600 flex items-center gap-28 mt-4 ml-3">
            <div className="flex items-center gap-5">
              <FaUser />
              <div className="font-kosugi">Personal details</div>
            </div>
            <div className=" text-customGreen hover:text-green-700">
              <FaPencilAlt className="cursor-pointer" onClick={handleSave} />
            </div>
          </div>
          <div className="mt-8 ml-5">
            <div className="text-gray-400">
              <p>Name</p>
            </div>
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-gray-900 outline-none border border-gray-300 rounded px-2 py-1"
              />
            ) : (
              <div className="text-gray-900">{name || "Your Name"}</div>
            )}
          </div>

          <div className="mt-3 ml-5">
            <div className="text-gray-400">
              <p>Email</p>
            </div>
            {isEditing ? (
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-gray-900 outline-none border border-gray-300 rounded px-2 py-1"
              />
            ) : (
              <div className="text-gray-900">{email || "your email"}</div>
            )}
          </div>

          <div className="mt-3 ml-5">
            <div className="text-gray-400">
              <p>Username</p>
            </div>
            <div className="text-gray-900">{userName}</div>
          </div>

          <div className="mt-3 ml-5">
            <div className="text-gray-400">
              <p>Location</p>
            </div>
            {isEditing ? (
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="text-gray-900 outline-none border border-gray-300 rounded px-2 py-1"
              />
            ) : (
              <div className="text-gray-900">{location}</div>
            )}
          </div>
          {isEditing && (
            <div className="mt-5 ml-5">
              <button
                className="bg-customGreen text-white px-4 py-2 rounded shadow hover:bg-green-700"
                onClick={handleSave}
              >
                <FaSave className="inline-block mr-2" />
                Save
              </button>
            </div>
          )}
          <footer>
            <button
              type="submit"
              onClick={handleLogout}
              className="w-80 h-10 bg-customGreen text-white font-kosugi bottom-0 fixed "
            >
              Logout
            </button>
          </footer>
        </div>
      </TooltipProvider>
    </>
  );
}

export default Setting;
