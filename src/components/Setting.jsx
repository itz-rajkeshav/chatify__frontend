import React, { useEffect, useState } from "react";
import { FaCamera, FaUser, FaPencilAlt, FaSave } from "react-icons/fa";
import StatusSelect from "./StatusSelect";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setName, setEmail, setprofilePic, setcoverImage } from "./UserSlice";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import axiosInstance from "@/lib/axios";
function Setting() {
  const [ShowIcon, setShowIcon] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { email, name, userName, profilePic, Id, coverImage } = useSelector(
    (state) => {
      return state.User;
    }
  );
  const [backgroundImage, setBackgroundImage] = useState(coverImage);
  const [location, setLocation] = useState("India"); //currently hardcode it :)
  const navigate = useNavigate();
  const [changeProfilepic, setchangeProfilepic] = useState(profilePic);
  const [ChangeName, setChangeName] = useState(name);
  const [ChangeEmail, setChangeEmail] = useState(email);
  const dispatch = useDispatch();
  const jsonData = {
    Id: Id,
    gmail: ChangeEmail,
    Name: ChangeName,
    location: location,
    avatar: changeProfilepic,
    coverImage: backgroundImage,
  };
  const handleSave = async () => {
    try {
      const response = await axiosInstance.post("/updateUser", jsonData);
    } catch (error) {
      console.log(error);
    }
    setShowIcon(!ShowIcon);
    setIsEditing(!isEditing);
    dispatch(setName(ChangeName));
    dispatch(setEmail(ChangeEmail));
    dispatch(setprofilePic(changeProfilepic));
    dispatch(setcoverImage(backgroundImage));
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
      setchangeProfilepic(imageUrl);
    }
  };
  // console.log(userName);
  // useEffect(() => {
  //   if ("geolocation" in navigator) {
  //     console.log("Geolocation is available");
  //     navigator.geolocation.getCurrentPosition(
  //       async (position) => {
  //         console.log("Got position:", position.coords);
  //         try {
  //           const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=apikey`;
  //           const response = await axios.get(apiUrl);
  //           console.log(response.data);
  //         } catch (error) {
  //           console.log("API Error:", error.message);
  //           if (error.response) {
  //             console.log("Error response:", error.response.data);
  //           }
  //         }
  //       },
  //       (error) => {
  //         // console.log("Geolocation error:", error.message);
  //         console.error("Geolocation error:", error.code, error.message);
  //         switch (error.code) {
  //           case 1:
  //             console.log("User denied location access.");
  //             break;
  //           case 2:
  //             console.log("Position unavailable.");
  //             break;
  //           case 3:
  //             console.log("Timeout occurred.");
  //             break;
  //           default:
  //             console.log("Unknown error.");
  //         }
  //       }
  //     );
  //   } else {
  //     console.log("Geolocation is NOT available");
  //   }
  // }, []);

  return (
    <>
      <TooltipProvider>
        <div className="w-80 h-screen bg-white-100  shadow-lg">
          <div className=" bg-customGreen relative h-40 w-80">
            {backgroundImage && (
              <img
                src={backgroundImage}
                className="h-40 w-80 object-cover absolute top-0 left-0"
                alt="Background"
              />
            )}
            <div className="flex justify-between items-center absolute top-4 w-full px-6">
              <div className="text-xl ml-5 font-kosugi text-white ">
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
                      changeProfilepic
                        ? changeProfilepic
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
                value={ChangeName}
                onChange={(e) => setChangeName(e.target.value)}
                className="text-gray-900 outline-none border border-gray-300 rounded px-2 py-1"
              />
            ) : (
              <div className="text-gray-900">{ChangeName || "Your Name"}</div>
            )}
          </div>

          <div className="mt-3 ml-5">
            <div className="text-gray-400">
              <p>Email</p>
            </div>
            {isEditing ? (
              <input
                type="text"
                value={ChangeEmail}
                onChange={(e) => setChangeEmail(e.target.value)}
                className="text-gray-900 outline-none border border-gray-300 rounded px-2 py-1"
              />
            ) : (
              <div className="text-gray-900">{ChangeEmail || "your email"}</div>
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
