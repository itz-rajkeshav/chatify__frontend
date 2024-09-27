import React from "react";
import { FaSearch, FaPlus } from "react-icons/fa";

function Chat() {
  return (
    <>
      <div className="w-80 h-screen bg-white-100 overflow-y-auto shadow-lg ">
        <div className="text-2xl font-kosugi text-gray-800 ml-6 mt-10">
          <p>Chats</p>
        </div>
        <div className="ml-4 flex w-72 bg-slate-200 items-center pr-4 mt-6 rounded-full shadow-md">
          <input
            type="text"
            className="h-10 bg-slate-200 w-full text-gray-700 pl-4 pr-2 rounded-full outline-none"
            placeholder="Search username or message"
          />
          <button>
            <FaSearch className="text-customGreen" />
          </button>
        </div>

        <div className="mt-10">
          <div className="font-kosugi text-gray-800 ml-6 mb-3">
            <p>Direct Messages</p>
          </div>

          <div className="pl-3 w-full h-16 mt-6 bg-gray-50 shadow-md flex flex-col justify-center rounded-lg hover:bg-customGreen hover:text-white transition duration-300">
            <p className="font-bold">Username</p>
            <p className="text-sm">i am good</p>
          </div>

          <div className="pl-3 w-full h-16 bg-gray-50 shadow-md flex flex-col justify-center rounded-lg mt-2 hover:bg-customGreen hover:text-white transition duration-300">
            <p className="font-bold">Username</p>
            <p className="text-sm">meet at 3 PM</p>
          </div>

          <div className="pl-3 w-full h-16 bg-gray-50 shadow-md flex flex-col justify-center rounded-lg mt-2 hover:bg-customGreen hover:text-white transition duration-300">
            <p className="font-bold">Username</p>
            <p className="text-sm">Project</p>
          </div>
        </div>
        <div className="mt-10">
          <div className="flex justify-between items-center ml-6 mr-6">
            <p className="font-kosugi text-gray-800">Groups</p>
            <button className="text-customGreen hover:text-customGreen-dark transition duration-300">
              <FaPlus className="text-xl" />
            </button>
          </div>

          <div className="pl-3 w-full h-16 bg-gray-50 shadow-md flex flex-col justify-center rounded-lg mt-6 hover:bg-customGreen hover:text-white transition duration-300">
            <p className="font-bold">Work Group</p>
            <p className="text-sm">Latest message</p>
          </div>

          <div className="pl-3 w-full h-16 bg-gray-50 shadow-md flex flex-col justify-center rounded-lg mt-2 hover:bg-customGreen hover:text-white transition duration-300">
            <p className="font-bold">Friends Group</p>
            <p className="text-sm">Let's plan a trip!</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
