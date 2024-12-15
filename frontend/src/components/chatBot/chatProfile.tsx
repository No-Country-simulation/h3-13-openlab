import chati from "../../assets/icons/bot.png"

const ChatProfile = () => {
  return (
    <div
      style={{
        width: '4em',
        height: '4em',
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:"1em"
      }}
    >
      <img src={chati} alt="bot"/>
    </div>
  );
};

export default ChatProfile;
