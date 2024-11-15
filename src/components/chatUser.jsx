import React from "react";

function ChatUser({ Name }) {
  return (
    <div className=" w-full h-16 mt-3  bg-gray-50 shadow-md flex flex-col justify-center rounded-lg hover:bg-customGreen hover:text-white transition duration-300">
      <p className="font-bold flex ml-5">{Name}</p>
      {/* <p className="text-sm">i am good</p> */}
    </div>
  );
}
export default ChatUser;
