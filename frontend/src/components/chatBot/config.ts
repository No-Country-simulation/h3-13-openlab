import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
  botName: 'OpenBot', 
  initialMessages: [createChatBotMessage('¡Hola! Soy un Openbot, ¿en qué puedo ayudarte hoy?', {})], 
  state: {}, 
  customComponents: {},
  customStyles: {
    botMessageBox: {
      backgroundColor: '#4f6d7a',
    },
    chatButton: {
      backgroundColor: '#1a73e8',
    },
  },
};

export default config;
