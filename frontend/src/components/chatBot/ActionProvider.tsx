import React from 'react';

interface ActionProviderProps {
  createChatBotMessage: (message: string) => any;
  setState: React.Dispatch<React.SetStateAction<any>>;
}

class ActionProvider {
  private createChatBotMessage: (message: string) => any;
  private setState: React.Dispatch<React.SetStateAction<any>>;

  constructor(createChatBotMessage: (message: string) => any, setStateFunc: React.Dispatch<React.SetStateAction<any>>) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleHello = () => {
    const message = this.createChatBotMessage('¿en qué puedo ayudarte hoy?');
    this.setState((prevState: any) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };

  handleHelp = () => {
    const message = this.createChatBotMessage('Claro, ¿qué tipo de ayuda necesitas?');
    this.setState((prevState: any) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };

  // You can add more actions here
}

export default ActionProvider;
