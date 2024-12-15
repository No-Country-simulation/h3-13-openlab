import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from './config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import 'react-chatbot-kit/build/main.css'

const ChatbotComponent = () => {
  return (
    <div>
        <div  className="fixed bottom-5 right-5 z-50">
      <Chatbot 
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
        />
        </div>
    </div>
  );
};

export default ChatbotComponent;
