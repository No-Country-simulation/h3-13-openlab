import ActionProvider from "./ActionProvider";

class MessageParser {
  actionProvider: ActionProvider;

  constructor(actionProvider: ActionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message: string) {
    const lowercasedMessage = message.toLowerCase();

    if (lowercasedMessage.includes("hola") || lowercasedMessage.includes("bienvenido")) {
      this.actionProvider.handleWelcome();
      return;
    }

    if (lowercasedMessage.includes("crear dao") || lowercasedMessage.includes("nueva iniciativa")) {
      this.actionProvider.handleCreateDAO();
      return;
    }

    if (lowercasedMessage.includes("¿qué es una dao") || lowercasedMessage.includes("dao")) {
      this.actionProvider.handleDefineDAO();
      return;
    }

    if (lowercasedMessage.includes("¿qué es una iniciativa") || lowercasedMessage.includes("iniciativa")) {
      this.actionProvider.handleDefineInitiative();
      return;
    }

    if (lowercasedMessage.includes("¿qué es el libro de órdenes") || lowercasedMessage.includes("libro de órdenes")) {
      this.actionProvider.handleDefineOrderBook();
      return;
    }

    if (lowercasedMessage.includes("ayuda") || lowercasedMessage.includes("soporte")) {
      this.actionProvider.handleHelp();
      return;
    }

    this.actionProvider.handleUnknown();
  }
}

export default MessageParser;
