class ActionProvider {
  private createChatBotMessage: (message: string) => any;
  private setState: React.Dispatch<React.SetStateAction<any>>;

  constructor(createChatBotMessage: (message: string) => any, setStateFunc: React.Dispatch<React.SetStateAction<any>>) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleWelcome = () => {
    const message = this.createChatBotMessage(
      ' Bienvenido a OpenLab, la plataforma para crear startups colaborativas. ¿Cómo puedo asistirte hoy?'
    );
    this.setState((prevState: any) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };

  handleCreateDAO = () => {
    const message = this.createChatBotMessage(
      'Puedes crear una DAO para tu iniciativa colaborativa. Solo necesitas proporcionar los detalles de tu proyecto y nuestro sistema se encargará del resto. ¿Te gustaría saber más sobre cómo hacerlo?'
    );
    this.setState((prevState: any) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };

  handleDefineDAO = () => {
    const message = this.createChatBotMessage(
      'Una DAO (Organización Autónoma Descentralizada) es una entidad gestionada mediante contratos inteligentes en una blockchain. Las decisiones se toman de manera colectiva por los miembros, quienes poseen tokens que representan su participación. Este modelo garantiza transparencia, meritocracia y autonomía.'
    );
    this.setState((prevState: any) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };

  handleDefineInitiative = () => {
    const message = this.createChatBotMessage(
      'Una iniciativa es un proyecto colaborativo que puede ser creado dentro de OpenLab. Representa una idea que busca convertirse en una startup, y permite a los participantes colaborar activamente o comprar tokens para apoyar su desarrollo.'
    );
    this.setState((prevState: any) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };

  handleDefineOrderBook = () => {
    const message = this.createChatBotMessage(
      'El libro de órdenes es un sistema donde se registran todas las órdenes de compra y venta de activos. En OpenLab, permite intercambiar Opencoins (nuestra criptomoneda) por tokens emitidos por las iniciativas (DAO).'
    );
    this.setState((prevState: any) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };

  handleHelp = () => {
    const message = this.createChatBotMessage(
      'Puedo asistirte con información sobre DAO, iniciativas, el libro de órdenes o cómo empezar en OpenLab. ¿En qué tema necesitas ayuda?'
    );
    this.setState((prevState: any) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };

  handleUnknown = () => {
    const message = this.createChatBotMessage(
      'Lo siento, no entiendo tu consulta. ¿Podrías preguntar sobre DAO, iniciativas, el libro de órdenes o cualquier otra funcionalidad de OpenLab?'
    );
    this.setState((prevState: any) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
}

export default ActionProvider;
