// src/components/ChatWidget.jsx
import React, { useState } from "react";
import Channel from "./Channels";

const ChatWidget = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700"
      >
        {isOpen ? "Close Chat" : "Open Chat"}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="mt-2 w-[350px] h-[500px] bg-white border border-gray-300 rounded-xl shadow-xl overflow-hidden">
          <Channel user={user} />
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
