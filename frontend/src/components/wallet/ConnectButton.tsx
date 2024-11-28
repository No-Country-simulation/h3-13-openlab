import { useAppKit } from "@reown/appkit/react";

const ConnectButton = () => {
  // 4. Use modal hook
  const { open } = useAppKit();

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        className="p-2 bg-white rounded-lg text-color-3"
        onClick={() => open()}
      >
        Open Connect Modal
      </button>
      <button
        className="p-2 bg-white rounded-lg text-color-3"
        onClick={() => open({ view: "Networks" })}
      >
        Open Network Modal
      </button>
    </div>
  );
};

export default ConnectButton;
