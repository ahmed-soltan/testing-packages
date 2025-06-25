"use client";

import { ChatForm } from "@/components/chat/chat-form";
import { ChatMessages } from "@/components/chat/chat-messages";
import { socket } from "@/lib/socket-client";
import React, { useEffect, useState } from "react";

const ChatPage = () => {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [joined, setJoined] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [messages, setMessages] = useState<
    { sender: string; message: string }[]
  >([]);

  useEffect(() => {
    socket.on("message", (data) => {
      console.log(data);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: data.sender, message: data.message },
      ]);
    });

    socket.on("user_joined", (data) => {
      console.log(data);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "system", message: data },
      ]);
    });

    return () => {
      socket.off("user_joined");
      socket.off("message");
    };
  }, []);

  const handleJoinRoom = () => {
    if (roomId && username) {
      if (!socket.connected) {
        console.log("Connecting to server...");
        socket.connect();
      }

      console.log("Emitting join-room event:", { room: roomId, username });
      socket.emit("join-room", { room: roomId, username });
      setJoined(true);
    } else {
      console.error("Missing roomId or username");
    }
  };

  const sendMessage = (message: string) => {
    const data = { room: roomId, message, sender: username };

    socket.emit("message", data);
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: username!, message },
    ]);
  };

  return (
    <div className="flex mt-24 justify-center w-full">
      {!joined ? (
        <div className="w-full max-w-md mx-auto p-5 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Join Chat Room</h2>
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomId || ""}
            onChange={(e) => setRoomId(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="text"
            placeholder="Enter Username"
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <button
            onClick={handleJoinRoom}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Join Room
          </button>
        </div>
      ) : (
        <div className="w-full max-w-3xl mx-auto">
          <div className="mb-4 text-2xl font-bold">Room 1: {roomId}</div>
          <div className="h-[500px] overflow-y-auto bg-gray-200 p-5 mb-5 border-2 rounded-lg">
            {messages.map((msg, index) => (
              <ChatMessages
                key={index}
                message={msg.message}
                isOwnMessage={msg.sender === username}
                sender={msg.sender}
              />
            ))}
          </div>
          <ChatForm sendMessage={sendMessage} />
        </div>
      )}
    </div>
  );
};

export default ChatPage;
