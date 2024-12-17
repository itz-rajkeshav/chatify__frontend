import React, { useState, useEffect } from "react";
import Chat from "../components/leftchat.jsx";
import InitialChatUi from "@/components/InitialChatUi.jsx";

function ChatPage() {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex">
      <Chat />
      {!isMobileView && <InitialChatUi />}
    </div>
  );
}

export default ChatPage;
