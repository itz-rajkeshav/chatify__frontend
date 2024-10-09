import React from "react";
import { FaComments, FaCommentDots, FaUser } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { useSelector } from "react-redux";
// import Profile from "./Profile";
// import Setting from "./Setting";
// import Chat from "./chat";
function Slidenav() {
  const { profilePic } = useSelector((state) => state.User);
  // console.log(profilePic);
  return (
    <>
      <div className="bg-customGray h-screen w-20 flex flex-col items-center justify-between">
        <div className="mt-8">
          <button>
            <FaComments className="text-customGreen text-3xl" />
          </button>
        </div>
        <div className="flex flex-col items-center space-y-8">
          <button>
            <FaCommentDots className="text-3xl text-customGrayProfile hover:text-customGreen" />
          </button>
          <button>
            <FaUser className="text-3xl text-customGrayProfile hover:text-customGreen" />
          </button>
          <button>
            <FiSettings className="text-3xl text-customGrayProfile hover:text-customGreen" />
          </button>
        </div>
        <div className="mb-8">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-customGreen">
            <img
              src={profilePic ? profilePic : "https://via.placeholder.com/100"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Slidenav;
