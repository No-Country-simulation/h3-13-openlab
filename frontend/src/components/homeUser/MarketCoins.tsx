import CryptoList from "./CryptoList";

const MarketCoins = () => {
  return (
    <div className="w-[680px] h-[500px] rounded-2xl shadow-lg overflow-auto scrollbar-webkit">
      <CryptoList />
    </div>
  );
};

export default MarketCoins;
