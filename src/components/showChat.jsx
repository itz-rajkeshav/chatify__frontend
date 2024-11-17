import React, { useEffect } from "react";
import Chat from "./leftchat";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BsFillSendFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import { FaSmile } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  setEmail_2,
  setName_2,
  setuserName_2,
  setprofilePic_2,
} from "./UserSlice2";
import { io } from "socket.io-client";

function ShowChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [Emoji, setEmoji] = useState(false);
  const { profilePic, email, name, userName } = useSelector((state) => {
    return state.User;
  });
  const { profilePic_2, email_2, name_2, userName_2 } = useSelector((state) => {
    return state.user_2 || {};
  });
  const socket = io();
  const dispatch = useDispatch();
  const { convoId } = useParams();
  const socket = io("http://localhost:");

  // console.log(convoId);
  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput("");
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  const showEmoji = () => {
    setEmoji(!Emoji);
  };
  const handleEmojiSelect = (emoji) => {
    setInput(input + emoji.emoji);
    setEmoji(false);
  };
  useEffect(() => {
    if (!convoId) return;
    const fetchUserData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/getProfile",
          {
            convoId: convoId,
          }
        );
        console.log("API Response:", response.data);
        console.log(name);
        if (response.data.data.userData[0].Name === name) {
          dispatch(setName_2(response.data.data.userData[1].Name));
          dispatch(setEmail_2(response.data.data.userData[1].gmail));
          dispatch(setuserName_2(response.data.data.userData[1].userName));
          dispatch(setprofilePic_2(response.data.data.userData[1].avatar));
        } else {
          dispatch(setName_2(response.data.data.userData[0].Name));
          dispatch(setEmail_2(response.data.data.userData[0].gmail));
          dispatch(setuserName_2(response.data.data.userData[0].userName));
          dispatch(setprofilePic_2(response.data.data.userData[0].avatar));
        }
        // console.log(response.data.data.userData[1].Name);
        // dispatch(setName_2(response.data.data.userData[1].Name));
        // console.log(response.data.data.userData[1].avatar);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [convoId]);
  return (
    <div className="flex w-full h-screen">
      <Chat />
      <div className="flex-1 h-screen bg-gray-200 overflow-hidden">
        <div className="w-full overflow-hidden">
          <div className="grid grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <img
                key={index}
                src="/public/backgroung.png"
                alt="background"
                className="w-full h-full object-cover"
              />
            ))}
          </div>
        </div>
        <div className="absolute top-0 left-[400px] right-0 flex items-center bg-opacity-60 backdrop-blur-md bg-gray-100/80 p-4 h-20 shadow-lg rounded-md">
          <div className="flex items-center space-x-3">
            <img
              src={
                profilePic_2 ? profilePic_2 : "https://via.placeholder.com/100"
              }
              alt="Profile"
              className="rounded-full w-12 h-12 border-2 border-white shadow-md"
            />
            <div>
              <span className="text-gray-700 font-semibold text-lg">
                {name_2 ? name_2 : "Name"}
              </span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-3 h-3 bg-green-800 rounded-full animate-pulse"></div>
                <span className="text-green-900 text-sm">Online</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-24 bottom-20 left-[390px] right-2 overflow-y-auto px-4">
          {messages.map((msg, index) => (
            <div key={index} className="flex my-3 justify-end">
              <div className="relative max-w-[70%]">
                <div className="absolute -top-2 -right-2 z-10">
                  <img
                    src={
                      msg.sender === email
                        ? profilePic
                        : profilePic_2 || "https://via.placeholder.com/40"
                    }
                    alt="avatar"
                    className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                  />
                </div>

                {/* Message Content */}
                <div className="relative p-3 bg-green-800 text-white rounded-lg rounded-tr-none ml-2">
                  <p className="break-words">{msg}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {Emoji && (
          <div className="absolute bottom-20 right-6">
            <EmojiPicker onEmojiClick={handleEmojiSelect} height={400} />
          </div>
        )}

        <div className="absolute bottom-0 left-[400px] right-0 border-t border-gray-200 bg-white p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onKeyPress={handleKeyPress}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 border mb-1 border-gray-300 rounded-lg focus:outline-none focus:border-customGreen"
            />
            <button className="text-amber-600 text-2xl" onClick={showEmoji}>
              <FaSmile />
            </button>
            <Button
              onClick={handleSend}
              className="w-14 h-10 bg-customGreen hover:bg-green-600"
            >
              <BsFillSendFill />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowChat;
