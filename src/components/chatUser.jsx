import React from "react";

function ChatUser({ userName }) {
  return (
    <div className="pl-3 w-full h-16 mt-6 bg-gray-50 shadow-md flex flex-col justify-center rounded-lg hover:bg-customGreen hover:text-white transition duration-300">
      <p className="font-bold">{userName}</p>
      {/* <p className="text-sm">i am good</p> */}
    </div>
  );
}

export default ChatUser;
