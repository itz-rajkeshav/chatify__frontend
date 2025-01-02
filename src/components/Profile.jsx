import React from "react";
import { useSelector } from "react-redux";
import { BiUser } from "react-icons/bi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
function Profile() {
  const { profilePic, email, name, userName, coverImage } = useSelector(
    (state) => {
      return state.User;
    }
  );
  return (
    <>
      <div className="w-80 h-screen bg-white-100  shadow-lg">
        <div className="w-80 h-40 bg-customGreen relative">
          {coverImage && (
            <img
              src={coverImage}
              className="h-40 w-80 object-cover absolute top-0 left-0"
              alt="Background"
            />
          )}
          <div className="flex justify-between items-center absolute top-4 w-full px-6">
            <div className="text-xl ml-5  font-kosugi text-white ">
              <p>My Profile</p>
            </div>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-35px]">
            <div className="relative w-20 h-20 rounded-full border-4 border-white">
              <div className="overflow-hidden w-full h-full rounded-full">
                <img
                  src={
                    profilePic ? profilePic : "https://via.placeholder.com/100"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center flex-col mt-16">
          <div className="text-2xl font-poppins font-bold text-gray-800 ">
            <p>{name}</p>
          </div>
          <div className="text-xl mt-3 text-customGray">
            <p>{userName}</p>
          </div>
        </div>
        <div className="mt-5 text-gray-300">
          <p>________________________________________________</p>
        </div>
        <div className="mt-8 flex flex-col ml-8 gap-5 text-gray-800">
          <div className="flex items-center gap-5">
            <div>
              <FaMapMarkerAlt />
            </div>
            <div className="text-xl font-poppins">
              <p>Your location</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div>
              <SiGmail />
            </div>
            <div className="text-xl font-poppins">
              <p>{email}</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div>
              <BiUser />
            </div>
            <div className="text-xl font-poppins">
              <p>{userName}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
