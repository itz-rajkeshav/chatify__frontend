import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import ChatUser from "./chatUser";
import { SearchGlobalUser } from "./SearchGlobalUser";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/lib/axios";

function Chat() {
  const [UserConvolength, setUserConvolength] = useState(0);
  const [conversations, setConversations] = useState([]);
  const { name } = useSelector((state) => state.User);
  const navigate = useNavigate();

  const handleShow = (id) => {
    navigate(`/chat/convoId/${id}`);
  };

  useEffect(() => {
    const fetchAllConvo = async () => {
      try {
        const response = await axiosInstance.get("/allConvo");
        const allConvolength = response.data.data;
        setUserConvolength(allConvolength);

        const conversationsData = response.data.message;
        const formattedConversations = conversationsData.map((conv) => ({
          _id: conv._id,
          Name:
            conv.userData[1].Name === name
              ? conv.userData[0].Name
              : conv.userData[1].Name,
        }));
        setConversations(formattedConversations);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllConvo();
  }, [name]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-full sm:w-screen md:w-64 lg:w-96 h-full bg-gray-100 shadow-lg overflow-y-auto">
        <div className="text-2xl flex items-center justify-between font-kosugi text-gray-800 mb-6 p-4">
          <p className="ml-6">Chats</p>
          <SearchGlobalUser />
        </div>
        <div className="flex bg-slate-200 items-center px-4 py-2 rounded-full shadow-md mx-4">
          <input
            type="text"
            className="flex-1 h-10 bg-slate-200 text-gray-700 rounded-full outline-none"
            placeholder="Search username or message"
          />
          <button>
            <FaSearch className="text-customGreen" />
          </button>
        </div>
        <div className="mt-6 p-4">
          <div className="font-kosugi text-gray-800 mb-4">
            <p>Direct Messages</p>
          </div>
          {UserConvolength > 0 ? (
            <div className="space-y-2">
              {conversations.map((conversation) => (
                <button
                  key={conversation._id}
                  className="w-full text-left"
                  onClick={() => handleShow(conversation._id)}
                >
                  <ChatUser Name={conversation.Name} />
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              Select a user to start chatting
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
