import { useAppKit } from "@reown/appkit/react";

const ConnectButton = () => {
  // 4. Use modal hook
  const { open } = useAppKit();

  return (
    <>
      <button onClick={() => open()}>Open Connect Modal</button>
      <button onClick={() => open({ view: "Networks" })}>
        Open Network Modal
      </button>
    </>
  );
};

export default ConnectButton;
