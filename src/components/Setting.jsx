import React, { useState } from "react";
import { FaCamera, FaUser, FaPencilAlt, FaSave } from "react-icons/fa";
import StatusSelect from "./StatusSelect";

function Setting() {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Your Name");
  const [email, setEmail] = useState("Your email");
  const [location, setLocation] = useState("Your location");

  const handleSave = () => {
    setIsEditing(!isEditing);
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

  return (
    <>
      <div className="w-80 h-screen bg-white-100 overflow-y-auto shadow-lg">
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
            <div className="">
              <label className="text-white cursor-pointer shadow-lg hover:text-gray-700">
                <FaCamera />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBackgroundChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-35px]">
            <div className="relative w-20 h-20 rounded-full border-4 border-white">
              <div className="overflow-hidden w-full h-full rounded-full">
                <img
                  src={
                    profileImage
                      ? profileImage
                      : "https://via.placeholder.com/100"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="absolute bottom-3 left-10 translate-x-1/2 translate-y-1/2 p-1 bg-gray-600 rounded-full text-white cursor-pointer">
                <FaCamera />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-14">
          <StatusSelect />
        </div>

        <div className="text-gray-300">
          <p>______________________________________________________</p>
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
            <div className="text-gray-900">{name}</div>
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
            <div className="text-gray-900">{email}</div>
          )}
        </div>

        <div className="mt-3 ml-5">
          <div className="text-gray-400">
            <p>Username</p>
          </div>
          <div className="text-gray-900">Your Username</div>
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
            {/* at the time of handleing the state remember to implement the value section in the input to save the  data and scahne the handlesaave */}
          </div>
        )}
      </div>
    </>
  );
}

export default Setting;
