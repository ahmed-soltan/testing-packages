import React from "react";

export const ChatMessages = ({
  message,
  isOwnMessage = false,
  sender,
}: {
  isOwnMessage: boolean;
  message: string;
  sender?: string;
}) => {
  const isSystemMessage = sender === "system";
  return (
    <div
      className={`flex ${isSystemMessage ? "justify-center" : isOwnMessage ? "justify-end" : "justify-start"}`}
    >
      <div className="flex flex-col gap-2 max-w-xs px-4 py-2 rounded-md">
        {isSystemMessage && (
          <div className="bg-gray-800 text-gray-100 rounded-md p-2">
            <p className="text-sm">{message}</p>
          </div>
        )}
        {!isSystemMessage && (
          <div
            className={` rounded-md p-2 ${isOwnMessage ? "self-end bg-blue-500 text-white" : "self-start bg-gray-300 text-black"}`}
          >
            <p className="text-sm">{message}</p>
          </div>
        )}
        <div className=""></div>
      </div>
    </div>
  );
};
