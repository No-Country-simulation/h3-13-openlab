import MarketCoins from "./MarketCoins";
import StatsList from "./StatsList";
import UserBalance from "./UserBalance";

const UserStats = () => {
  return (
    <div className="flex flex-col gap-10 my-10">
      <div className="container flex items-center justify-around">
        {/* Balance */}
        <UserBalance />
        {/* Stats */}
        <div className="flex flex-col w-[420px] h-[220px] rounded-2xl shadow-lg justify-evenly pl-10">
          <div className="flex items-center gap-8">
            <div className="h-2 rounded-lg w-9 bg-primary"></div>
            <p className="text-lg font-medium">Co-founder at Fractal</p>
          </div>
          <div className="flex items-center gap-8">
            <div className="h-2 rounded-lg w-9 bg-primary"></div>
            <p className="text-lg font-medium">Workspace ouner at Shared</p>
          </div>
          <div className="flex items-center gap-8">
            <div className="h-2 rounded-lg w-9 bg-primary"></div>
            <p className="text-lg font-medium">Colaborator at Easymed</p>
          </div>
        </div>
      </div>
      <div className="container flex items-center justify-around">
        {/* Market cryptos */}
        <MarketCoins />
        {/* Stats */}
        {<StatsList />}
      </div>
    </div>
  );
};

export default UserStats;
