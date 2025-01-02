import React, { useEffect, useState } from "react";
import Chat from "./leftchat";
import { Button } from "@/components/ui/button";
import { BsFillSendFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import { FaSmile } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaVideo } from "react-icons/fa";
import {
  setEmail_2,
  setName_2,
  setuserName_2,
  setprofilePic_2,
} from "./UserSlice2";
import { io } from "socket.io-client";
import axiosInstance from "@/lib/axios";
import { API_URL1 } from "@/config";
import VideoCall from "./videoCall";

function ShowChat() {
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 640);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [Emoji, setEmoji] = useState(false);
  const [socket, setSocket] = useState(null);
  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const { profilePic, email, name } = useSelector((state) => state.User);
  const { profilePic_2, email_2, name_2 } = useSelector(
    (state) => state.user_2 || {}
  );

  const dispatch = useDispatch();
  const { convoId } = useParams();

  //socket connection
  useEffect(() => {
    const newSocket = io(API_URL1);
    setSocket(newSocket);

    // Socket event listeners
    newSocket.on("connect", () => {
      console.log("Connected to socket server");
    });

    newSocket.on("receiveMessage", (receivedMessage) => {
      console.log("Received message:", receivedMessage);
      if (receivedMessage.convoId === convoId) {
        setMessages((prev) => [
          ...prev,
          {
            ...receivedMessage,
            type: receivedMessage.sender === email ? "sent" : "received",
          },
        ]);
      }
    });

    return () => {
      if (newSocket) newSocket.disconnect();
    };
  }, [convoId, email]);
  // Fetch user data and messages
  useEffect(() => {
    if (!convoId) return;

    const fetchUserData = async () => {
      try {
        // Fetch user profile
        const response = await axiosInstance.post("/getProfile", {
          convoId: convoId,
        });

        // Fetch recent messages
        const messagesResponse = await axiosInstance.post("/getMessages", {
          convoId: convoId,
        });
        const prevMessage = messagesResponse.data.data.map((item) => ({
          message: item.message,
          sender: item.sender,
          type: item.sender === email ? "sent" : "received",
        }));

        // Set user data
        const userData = response.data.data.userData;
        if (userData[0].Name === name) {
          dispatch(setName_2(userData[1].Name));
          dispatch(setEmail_2(userData[1].gmail));
          dispatch(setuserName_2(userData[1].userName));
          dispatch(setprofilePic_2(userData[1].avatar));
        } else {
          dispatch(setName_2(userData[0].Name));
          dispatch(setEmail_2(userData[0].gmail));
          dispatch(setuserName_2(userData[0].userName));
          dispatch(setprofilePic_2(userData[0].avatar));
        }
        if (
          messagesResponse.data &&
          Array.isArray(messagesResponse.data.messages)
        ) {
          const formattedMessages = messagesResponse.data.messages.map(
            (msg) => ({
              message: msg.message,
              sender: msg.sender,
              receiver: msg.receiver,
              convoId: msg.convoId,
              type: msg.sender === email ? "sent" : "received",
            })
          );
          setMessages(formattedMessages);
        }
        if (
          messagesResponse.data &&
          Array.isArray(messagesResponse.data.data)
        ) {
          const prevMessage = messagesResponse.data.data.map((item) => ({
            message: item.message,
            sender: item.sender,
            type: item.sender === email ? "sent" : "received",
          }));
          setMessages("");
          setMessages((prev) => [...prev, ...prevMessage]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, [convoId, name, dispatch, email]);
  const handleSend = async () => {
    if (!socket || !input.trim()) return;
    const messageData = {
      message: input.trim(),
      sender: email,
      receiver: email_2,
      convoId: convoId,
    };
    //sending to the db
    const response = await axiosInstance.post("/users/messages", messageData);
    console.log(response.data);
    //sending to the server
    socket.emit("sendMessage", messageData);

    setInput("");
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
  const handleVideoCall = () => {
    setShowVideoCall(true);
  };

  // Fetch user data
  useEffect(() => {
    if (!convoId) return;

    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.post("/getProfile", {
          convoId: convoId,
        });
        const response1 = await axiosInstance.post("/getMessages", {
          convoId: convoId,
        });
        // console.log(response1.data);
        const userData = response.data.data.userData;
        if (userData[0].Name === name) {
          dispatch(setName_2(userData[1].Name));
          dispatch(setEmail_2(userData[1].gmail));
          dispatch(setuserName_2(userData[1].userName));
          dispatch(setprofilePic_2(userData[1].avatar));
        } else {
          dispatch(setName_2(userData[0].Name));
          dispatch(setEmail_2(userData[0].gmail));
          dispatch(setuserName_2(userData[0].userName));
          dispatch(setprofilePic_2(userData[0].avatar));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [convoId, name, dispatch]);
  return (
    <>
      {!isMobileView && (
        <div className="flex w-full h-screen">
          <Chat />
          <div className="flex-1 h-screen bg-gray-200 overflow-hidden">
            {/* Background Images */}
            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[...Array(12)].map((_, index) => (
                <img
                  key={index}
                  src="/backgroung.png"
                  alt="background"
                  className="w-full h-40 object-cover sm:h-52 md:h-64 lg:h-80"
                />
              ))}
            </div>

            {/* Header */}
            <div className="absolute top-0 md:left-[335px] lg:left-[464px] right-0 flex items-center bg-opacity-60 backdrop-blur-md bg-gray-100/80 p-4 h-20 shadow-lg rounded-md">
              <div className="flex justify-between w-full items-center">
                <div className="flex items-center space-x-3">
                  <img
                    src={profilePic_2 || "https://via.placeholder.com/100"}
                    alt="Profile"
                    className="rounded-full w-12 h-12 border-2 border-white shadow-md"
                  />
                  <div>
                    <span className="text-gray-700 font-semibold text-lg">
                      {name_2 || "Name"}
                    </span>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="w-3 h-3 bg-green-800 rounded-full animate-pulse"></div>
                      <span className="text-green-900 text-sm">Online</span>
                    </div>
                  </div>
                </div>
                <div className="text-green-800 mr-7 ">
                  <button onClick={handleVideoCall}>
                    <FaVideo size={23}></FaVideo>
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="absolute top-24 bottom-20 md:left-[335px] lg:left-[450px] right-2 overflow-y-auto px-4">
              {messages.map((msg, index) => {
                const isSentByMe = msg.sender === email;
                return (
                  <div
                    key={index}
                    className={`flex my-3 ${
                      isSentByMe ? "justify-end mr-2" : "justify-start ml-4"
                    }`}
                  >
                    <div
                      className={`relative max-w-[70%] ${
                        isSentByMe ? "ml-auto" : "mr-auto"
                      }`}
                    >
                      <div
                        className={`absolute -top-2 ${
                          isSentByMe ? "-right-1" : "-left-1"
                        } z-10`}
                      >
                        <img
                          src={isSentByMe ? profilePic : profilePic_2}
                          alt="avatar"
                          className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                        />
                      </div>

                      <div
                        className={`relative p-3 ${
                          isSentByMe
                            ? "bg-green-800 text-white  rounded-lg rounded-tr-none"
                            : "bg-white text-gray-800 rounded-lg rounded-tl-none"
                        }`}
                      >
                        <p className="break-words">{msg.message}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {Emoji && (
              <div className="absolute bottom-20 right-6">
                <EmojiPicker onEmojiClick={handleEmojiSelect} height={400} />
              </div>
            )}

            {/* Input Section */}
            <div className="absolute bottom-0 md:left-[335px] lg:left-[464px] right-0 border-t border-gray-200 bg-white p-4">
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
              {/* {showVideoCall && (
                <VideoCall onClose={() => setShowVideoCall(false)} />
              )} */}
            </div>
          </div>
        </div>
      )}
      {isMobileView && (
        <div className="flex flex-col lg:flex-row w-screen h-screen">
          {/* Sidebar */}
          <div className="hidden lg:block w-[450px]">
            <Chat />
          </div>

          {/* Chat Section */}
          <div className="flex-1 h-full bg-gray-200 relative overflow-hidden">
            {/* Background Images */}
            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
              {[...Array(12)].map((_, index) => (
                <img
                  key={index}
                  src="/backgroung.png"
                  alt="background"
                  className="w-full h-40 object-cover"
                />
              ))}
            </div>

            {/* Header */}
            <div className="absolute top-0 left-0 lg:left-[450px] right-0 flex items-center bg-opacity-60 backdrop-blur-md bg-gray-100/80 p-4 h-20 shadow-lg">
              <div className="flex items-center space-x-4">
                <img
                  src={profilePic_2 || "https://via.placeholder.com/100"}
                  alt="Profile"
                  className="rounded-full w-12 h-12 ml-8 border-2 border-white"
                />
                <div>
                  <span className="text-gray-700 font-semibold text-lg">
                    {name_2 || "Name"}
                  </span>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-3 h-3 bg-green-800 rounded-full animate-pulse"></div>
                    <span className="text-green-900 text-sm">Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="absolute top-24 bottom-20 left-0 lg:left-[450px] right-0 overflow-y-auto px-4">
              {messages.map((msg, index) => {
                const isSentByMe = msg.sender === email;
                return (
                  <div
                    key={index}
                    className={`flex items-end my-4 ${
                      isSentByMe ? "justify-end" : "justify-start"
                    }`}
                  >
                    {/* Profile Picture for Received Messages */}
                    {!isSentByMe && (
                      <div className="w-8 h-8 flex-shrink-0">
                        <img
                          src={
                            profilePic_2 || "https://via.placeholder.com/100"
                          }
                          alt="Profile"
                          className="w-full h-full rounded-full border border-gray-300"
                        />
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div
                      className={`relative max-w-[70%] px-4 ${
                        isSentByMe ? "ml-3" : "mr-3"
                      }`}
                    >
                      <div
                        className={`relative p-4 shadow-lg ${
                          isSentByMe
                            ? "bg-green-800 text-white rounded-lg rounded-tr-none"
                            : "bg-white text-gray-800 rounded-lg rounded-tl-none"
                        }`}
                      >
                        <p className="break-words">{msg.message}</p>
                      </div>
                    </div>

                    {/* Profile Picture for Sent Messages */}
                    {isSentByMe && (
                      <div className="w-8 h-8 flex-shrink-0">
                        <img
                          src={profilePic || "https://via.placeholder.com/100"}
                          alt="Profile"
                          className="w-full h-full rounded-full border border-gray-300"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {Emoji && (
              <div className="absolute bottom-20 right-6">
                <EmojiPicker onEmojiClick={handleEmojiSelect} height={400} />
              </div>
            )}

            {/* Input Section */}
            <div className="absolute bottom-0 left-0 lg:left-[450px] right-0 border-t border-gray-200 bg-white p-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onKeyPress={handleKeyPress}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none"
                />
                <button className="text-amber-600 text-2xl" onClick={showEmoji}>
                  <FaSmile />
                </button>
                <Button
                  onClick={handleSend}
                  className="w-14 h-10 bg-green-800 hover:bg-green-600"
                >
                  <BsFillSendFill />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ShowChat;
