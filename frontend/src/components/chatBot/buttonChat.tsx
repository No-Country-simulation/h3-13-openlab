import { useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import config from './config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import 'react-chatbot-kit/build/main.css'
import { close , Bot } from '../../assets';

const MyChatbot = () => {
    const [showChatbot, setShowChatbot] = useState(false);

    const toggleChatbot = () => {
      setShowChatbot(!showChatbot);
    };
  
    return (
      <div>
        <button
          className="fixed bottom-5 right-5 bg-white rounded-full shadow-lg w-[5em] h-[5em] border"
          onClick={toggleChatbot}
        >
          {showChatbot ? 'Close' : <img src={Bot} />}
        </button>
  
        {showChatbot && (
          <div
            className="fixed bottom-5 right-5 z-50 transition-transform duration-300 ease-in-out transform"
            style={{ transform: 'translateY(0)' }}
          >
            <div className="bg-gradient-to-r from-blue-700 to-sky-400 pt-9 pb-2 pl-2 pr-2 rounded-lg shadow-lg">
              <button
                className="absolute top-2 right-2 rounded-lg shadow-lg items-centerjustify-center "
                onClick={toggleChatbot}
              >
                <img src={close} className='bg-white/80 rounded-lg'/>
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
