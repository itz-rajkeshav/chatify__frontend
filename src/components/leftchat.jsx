import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import ChatUser from "./chatUser";
import { SearchGlobalUser } from "./SearchGlobalUser";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/lib/axios";
function Chat() {
  // const [Showchat, setShowChat] = useState(false);
  const [UserConvolength, setUserConvolength] = useState(0);
  const [conversations, setConversations] = useState([]);
  const { profilePic_2, email_2, name_2, userName_2 } = useSelector((state) => {
    return state.user_2 || {};
  });
  const { profilePic, email, name, userName } = useSelector((state) => {
    return state.User;
  });
  const navigate = useNavigate();
  const handleShow = (id) => {
    console.log(id);
    navigate(`/chat/convoId/${id}`);
  };

  useEffect(() => {
    const fetchallconvo = async () => {
      try {
        const response = await axiosInstance.get("/allConvo");
        // console.log(response);
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
        // console.log(formattedConversations);
        setConversations(formattedConversations);
      } catch (error) {
        console.log(error);
      }
    };
    fetchallconvo();
  }, []);
  return (
    <>
      <div className="flex">
        <div className="w-full sm:w-72 md:w-80 lg:w-96 h-screen bg-gray-100 shadow-lg overflow-y-auto ">
          <div className="text-2xl flex items-center justify-between  font-kosugi text-gray-800 mb-6 ml-2 mt-12">
            <p>Chats</p>
            <SearchGlobalUser />
          </div>
          <div className="flex  bg-slate-200 items-center pr-4 mt-6 rounded-full shadow-md">
            {/* mb */}
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
            <div className="font-kosugi text-gray-800  mb-6">
              <p>Direct Messages</p>
            </div>
            {UserConvolength > 0 ? (
              <div className="space-y-2">
                {conversations.map((conversation) => {
                  return (
                    <button
                      key={conversation._id}
                      className="w-full"
                      onClick={() => handleShow(conversation._id)}
                    >
                      <ChatUser Name={conversation.Name} />
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="ml-6 text-gray-500 text-center">
                Select a user to start chatting
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
