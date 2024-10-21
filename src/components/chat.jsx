import React from "react";
import { FaSearch } from "react-icons/fa";
import ChatUser from "./chatUser";
import { SearchGlobalUser } from "./SearchGlobalUser";

function Chat() {
  return (
    <>
      <div className="w-80 h-screen bg-white-100  shadow-lg ">
        <div className="text-2xl flex items-center gap-44 font-kosugi text-gray-800 ml-6 mt-10">
          <div>
            <p>Chats</p>
          </div>
          <div>
            <SearchGlobalUser />
          </div>
        </div>
        <div className="ml-4 flex w-72 bg-slate-200 items-center pr-4 mt-6 rounded-full shadow-md">
          <input
            type="text"
            className="h-10 bg-slate-200 w-full text-gray-700 pl-4 pr-2 rounded-full outline-none"
            placeholder="Search username or message"
          />
          <button>
            <FaSearch className="text-customGreen" />
            {/* <p className="z-50 w-20 absolute top-11 left-80  overflow-hidden rounded-md bg-black ml-16 px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
              Add User
            </p> */}
          </button>
        </div>

        <div className="mt-10">
          <div className="font-kosugi text-gray-800 ml-6 mb-3">
            <p>Direct Messages</p>
          </div>
          <ChatUser userName={"ssss"} />
        </div>
      </div>
    </>
  );
}

export default Chat;
