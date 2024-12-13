import ActionProvider from "./ActionProvider";

class MessageParser {
  actionProvider: ActionProvider;

  constructor(actionProvider: ActionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message: string) {
    const lowercasedMessage = message.toLowerCase();

    // Si el mensaje contiene "hola", ejecuta la acción handleHello
    if (lowercasedMessage.includes("hola")) {
      this.actionProvider.handleHello();
    }

    // Si el mensaje contiene "ayuda", ejecuta la acción handleHelp
    if (lowercasedMessage.includes("ayuda")) {
      this.actionProvider.handleHelp();
    }

    // Puedes agregar más condiciones para manejar otros mensajes
  }
}

export default MessageParser;
