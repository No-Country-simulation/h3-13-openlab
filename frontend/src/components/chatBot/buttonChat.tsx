import { useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import config from './config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';

const MyChatbot = () => {
    const [showChatbot, setShowChatbot] = useState(false); 

    const toggleChatbot = () => {
      setShowChatbot(!showChatbot);
    };
  
    return (
      <div>

        <button
          className="fixed bottom-5 right-5 p-3 bg-blue-500 text-white rounded-full"
          onClick={toggleChatbot}
        >
          {showChatbot ? 'Cerrar Chatbot' : 'Abrir Chatbot'}
        </button>
  
        {showChatbot && (
          <div
            className="fixed bottom-5 right-5 z-50 transition-transform duration-300 ease-in-out transform"
            style={{ transform: 'translateY(0)' }}
          >
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <button
                className="absolute top-2 right-1 bg-red-500 text-white p-1 rounded-full"
                onClick={toggleChatbot}
              >
                X
              </button>

              <Chatbot
                config={config}
                messageParser={MessageParser}
                actionProvider={ActionProvider}
              />
            </div>
          </div>
        )}
      </div>
    );
  };
  

export default MyChatbot;
