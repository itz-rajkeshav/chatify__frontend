import { useEffect, useState } from "react";
import { FaComments, FaCommentDots, FaUser } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { FaBars } from "react-icons/fa";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function Slidenav() {
  const navigate = useNavigate();
  const { profilePic } = useSelector((state) => state.User);
  const [currentSection, setcurrentSection] = useState(null);
  const [MobileMenuOpen, setMobileMenuOpen] = useState(false);

  let location = useLocation();

  const handleChat = () => {
    navigate("/chat");
    setMobileMenuOpen(false);
  };
  const handleProfile = () => {
    navigate("/profile");
    setMobileMenuOpen(false);
  };
  const handlesetting = () => {
    navigate("/setting");
    setMobileMenuOpen(false);
  };
  useEffect(() => {
    console.log(location.pathname);
    if (location.pathname === "/chat") setcurrentSection("chat");
    if (location.pathname === "/profile") setcurrentSection("profile");
    if (location.pathname === "/setting") setcurrentSection("setting");
  }, [location.pathname]);
  return (
    <>
      <TooltipProvider>
        <div className="hidden md:flex">
          <div className="bg-customGray h-screen w-20 flex flex-col items-center justify-between">
            <div className="mt-8">
              <FaComments className="text-customGreen text-3xl" />
            </div>
            <div className="flex flex-col items-center gap-12 space-y-8">
              <Tooltip>
                <TooltipTrigger onClick={handleChat}>
                  <FaCommentDots
                    className={clsx(
                      "text-3xl text-customGrayProfile hover:text-customGreen",
                      {
                        "text-customGreen": currentSection === "chat",
                      }
                    )}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Chat</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger onClick={handleProfile}>
                  <FaUser
                    className={clsx(
                      "text-3xl text-customGrayProfile hover:text-customGreen",
                      {
                        "text-customGreen": currentSection === "profile",
                      }
                    )}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Profile</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger onClick={handlesetting}>
                  <FiSettings
                    className={clsx(
                      "text-3xl text-customGrayProfile hover:text-customGreen",
                      {
                        "text-customGreen": currentSection === "setting",
                      }
                    )}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Setting</p>
                </TooltipContent>
              </Tooltip>
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
        </div>
      </TooltipProvider>
      <div>
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!MobileMenuOpen)}
            className={clsx(
              "fixed top-4 left-3 z-50 text-customGreen text-2xl",
              {
                "text-white":
                  currentSection === "profile" || currentSection === "setting",
              }
            )}
          >
            {MobileMenuOpen ? <FiX /> : <FaBars />}
          </button>
          {MobileMenuOpen && (
            <>
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={() => setMobileMenuOpen(false)}
              />
              <div
                className={clsx(
                  "fixed top-0 left-0 h-full w-64 bg-customGray transform transition-transform duration-300 ease-in-out z-50 flex flex-col",
                  {
                    "translate-x-0": MobileMenuOpen,
                    "-translate-x-full": !MobileMenuOpen,
                  }
                )}
              >
                {/* Menu Items */}
                <div className="mt-20 flex flex-col items-center space-y-8">
                  <div
                    onClick={handleChat}
                    className={clsx(
                      "flex items-center space-x-4 w-full px-8 py-4 hover:bg-gray-700 cursor-pointer",
                      {
                        "text-customGreen": currentSection === "chat",
                        "text-customGrayProfile": currentSection !== "chat",
                      }
                    )}
                  >
                    <FaCommentDots className="text-2xl" />
                    <span>Chats</span>
                  </div>
                  <div
                    onClick={handleProfile}
                    className={clsx(
                      "flex items-center space-x-4 w-full px-8 py-4 hover:bg-gray-700 cursor-pointer",
                      {
                        "text-customGreen": currentSection === "profile",
                        "text-customGrayProfile": currentSection !== "profile",
                      }
                    )}
                  >
                    <FaUser className="text-2xl" />
                    <span>Profile</span>
                  </div>
                  <div
                    onClick={handlesetting}
                    className={clsx(
                      "flex items-center space-x-4 w-full px-8 py-4 hover:bg-gray-700 cursor-pointer",
                      {
                        "text-customGreen": currentSection === "setting",
                        "text-customGrayProfile": currentSection !== "setting",
                      }
                    )}
                  >
                    <FiSettings className="text-2xl" />
                    <span>Settings</span>
                  </div>
                </div>
                <div className="mt-auto mb-8 flex justify-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-customGreen">
                    <img
                      src={profilePic || "https://via.placeholder.com/100"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Slidenav;
