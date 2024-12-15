import { createChatBotMessage } from "react-chatbot-kit";
import React from "react";
import ChatProfile from "./chatProfile";

const config = {
  botName: "OpenBot",
  initialMessages: [
    createChatBotMessage("¡Hola! Soy OpenBot, ¿en qué puedo ayudarte hoy?", {}),
  ],
  state: {},

  customComponents: {
    botAvatar: (props: any) => React.createElement(ChatProfile, props),
  },

  customStyles: {
    botMessageBox: {
      backgroundColor: "#4f6d7a",
    },
    chatButton: {
      backgroundColor: "#1a73e8",
    },
  },
};

export default config;