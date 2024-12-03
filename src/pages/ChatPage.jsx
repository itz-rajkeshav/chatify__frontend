import React from "react";
import Chat from "../components/leftchat.jsx";
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
