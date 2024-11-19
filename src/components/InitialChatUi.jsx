import React from "react";
import { FaComments } from "react-icons/fa";
import { InitialChatbutton } from "./InitialChatbutton";

function InitialChatUi() {
  return (
    <>
      <div className=" overflow-hidden h-screen bg-gray-50 pl-4 ">
        <div className="flex">
          <img src="backgroung.png"></img>
          <img src="backgroung.png"></img>
          <img src="backgroung.png"></img>
        </div>
        <div className="flex">
          <img src="backgroung.png"></img>
          <img src="backgroung.png"></img>
          <img src="backgroung.png"></img>
        </div>
        <div className="h-28 w-28 bg-green-100 flex justify-center items-center rounded-full absolute top-1/3 left-2/4 ml-36">
          <FaComments className="text-customGreen text-6xl" />
        </div>
        <div className="absolute top-1/2 left-2/4 ml-20 font-poppins mt-4 text-xl">
          <p>Welcome to Chatify Chat App</p>
          <div className="ml-16 mt-6">
            <InitialChatbutton />
          </div>
        </div>
      </div>
    </>
  );
}
export default InitialChatUi;
