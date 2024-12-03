import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BsFillSendFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import { FaSmile } from "react-icons/fa";

function UserChatUi() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [Emoji, setEmoji] = useState(false);
  const { profilePic_2, email_2, name_2, userName_2 } = useSelector((state) => {
    return state.user_2 || {};
  });
  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput("");
    }
  };
  const showEmoji = () => {
    setEmoji(!Emoji);
  };
  const handleEmojiSelect = (emoji) => {
    setInput(input + emoji.emoji);
    setEmoji(false);
  };
  const backgroundImages = [
    "backgroung.png",
    "backgroung.png",
    "backgroung.png",
    "backgroung.png",
    "backgroung.png",
    "backgroung.png",
    "backgroung.png",
    "backgroung.png",
    "backgroung.png",
  ];
  return (
    <>
      <div className="w-full h-screen relative bg-white overflow-hidden">
        <div className="w-full overflow-hidden">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-1">
            {backgroundImages.map((image, index) => (
              <div key={index} className="aspect-square overflow-hidden">
                <img
                  src={image}
                  alt={`background ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 left-0 right-0 flex items-center bg-customGreen p-4 h-20 z-10">
          <div className="flex items-center space-x-3">
            <img
              src={
                profilePic_2 ? profilePic_2 : "https://via.placeholder.com/100"
              }
              alt="Profile"
              className="rounded-full w-10 h-10 border-2 border-white"
            />
            <div>
              <span className="text-white font-semibold">
                {name_2 ? name_2 : "Name"}
              </span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                <span className="text-green-100 text-sm">Online</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-20 bottom-20 left-0 right-0 overflow-y-auto px-4">
          {messages.map((msg, index) => (
            <div key={index} className="flex justify-end my-2">
              <div className="bg-green-900 text-white rounded-lg rounded-tr-none p-3 max-w-[70%]">
                {msg}
              </div>
            </div>
          ))}
        </div>

        {Emoji && (
          <div className="absolute bottom-20 right-6 z-20">
            <EmojiPicker onEmojiClick={handleEmojiSelect} height={400} />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
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
    </>
  );
}

export default UserChatUi;
