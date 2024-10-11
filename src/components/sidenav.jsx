import React, { useEffect, useState } from "react";
import { FaComments, FaCommentDots, FaUser } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { useSelector } from "react-redux";
import Profile from "./Profile";
import Setting from "./Setting";
import Chat from "./chat";
import clsx from "clsx";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Slidenav() {
  const navigate = useNavigate();
  const { profilePic } = useSelector((state) => state.User);
  const [currentSection, setcurrentSection] = useState(null);
  let location = useLocation();

  const handleChat = () => {
    navigate("/chat");
  };
  const handleProfile = () => {
    navigate("/profile");
  };
  const handlesetting = () => {
    navigate("/setting");
  };
  useEffect(() => {
    console.log(location.pathname);
    if (location.pathname === "/chat") setcurrentSection("chat");
    if (location.pathname === "/profile") setcurrentSection("profile");
    if (location.pathname === "/setting") setcurrentSection("setting");
  }, [location.pathname]);
  return (
    <>
      <div className="flex">
        <div className="bg-customGray h-screen w-20 flex flex-col items-center justify-between">
          <div className="mt-8">
            <button>
              <FaComments className="text-customGreen text-3xl" />
            </button>
          </div>
          <div className="flex flex-col items-center gap-12 space-y-8">
            <button onClick={handleChat}>
              <FaCommentDots
                className={clsx(
                  "text-3xl text-customGrayProfile hover:text-customGreen",
                  {
                    "text-customGreen": currentSection === "chat",
                  }
                )}
              />
            </button>
            <button onClick={handleProfile}>
              <FaUser
                className={clsx(
                  "text-3xl text-customGrayProfile hover:text-customGreen",
                  {
                    "text-customGreen": currentSection === "profile",
                  }
                )}
              />
            </button>
            <button onClick={handlesetting}>
              <FiSettings
                className={clsx(
                  "text-3xl text-customGrayProfile hover:text-customGreen",
                  {
                    "text-customGreen": currentSection === "setting",
                  }
                )}
              />
            </button>
          </div>
          <div className="mb-8">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-customGreen">
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
        <div></div>
      </div>
    </>
  );
}

export default Slidenav;
