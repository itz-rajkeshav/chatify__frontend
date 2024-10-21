import React from "react";
// import Setting from "../components/Setting.jsx";
import Chat from "../components/chat.jsx";
import InitialChatUi from "@/components/InitialChatUi.jsx";
function ChatPage() {
  return (
    <div className="flex ">
      <Chat />
      <InitialChatUi />
    </div>
  );
}

export default ChatPage;
