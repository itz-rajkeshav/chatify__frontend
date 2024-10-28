import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import ChatUser from "./chatUser";
import { SearchGlobalUser } from "./SearchGlobalUser";
import { useSelector } from "react-redux";
import UserChatUi from "./UserChatUi";
import InitialChatUi from "./InitialChatUi";

function Chat() {
  const [Showchat, setShowChat] = useState(false);
  const { profilePic_2, email_2, name_2, userName_2 } = useSelector((state) => {
    return state.user_2 || {};
  });

  const handleShow = () => {
    setShowChat(true);
  };

  return (
    <>
      <div className="flex">
        <div className="w-80 h-screen bg-white-100 shadow-lg">
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
            </button>
          </div>

          <div className="mt-10">
            <div className="font-kosugi text-gray-800 ml-6 mb-3">
              <p>Direct Messages</p>
            </div>
            {name_2 ? (
              <button className="w-full" onClick={handleShow}>
                <ChatUser Name={name_2} />
              </button>
            ) : (
              <p className="ml-6 text-gray-500">
                Select a user to start chatting
              </p>
            )}
          </div>
        </div>
        {Showchat ? <UserChatUi /> : <InitialChatUi />}
      </div>
    </>
  );
}

export default Chat;
