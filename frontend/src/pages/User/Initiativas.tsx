import { sumIcon , likeIcon, shareIcon } from "../../assets";

const initiativas = () => {
 
  const init = [
  {
    "name": "CryptoStar",
    "priceFluctuation": "5%",
    "colaborator": "John Doe",
    "buySellPrice": "$500 / $520",
    "tokens": "150",
    "missions": "3/5",
    "likes": "120",
    "shares":"100",
    "actions": "Details"
  },
  {
    "name": "TokenFlow",
    "priceFluctuation": "-3%",
    "colaborator": "Jane Smith",
    "buySellPrice": "$1200 / $1150",
    "tokens": "300",
    "missions": "2/4",
    "likes": "85" ,
    "shares":"100",
    "actions": "Edit"
  },
  {
    "name": "BlockStream",
    "priceFluctuation": "8%",
    "colaborator": "Alice Johnson",
    "buySellPrice": "$750 / $800",
    "tokens": "200",
    "missions": "4/6",
    "likes": "200",
    "shares":"100",
    "actions": "Remove"
  },
  {
    "name": "ChainSecure",
    "priceFluctuation": "0%",
    "colaborator": "Bob Brown",
    "buySellPrice": "$400 / $400",
    "tokens": "120",
    "missions": "1/3",
    "likes": "50" ,
    "shares":"100",
    "actions": "View"
  },
  {
    "name": "EcoCoin",
    "priceFluctuation": "10%",
    "colaborator": "Charlie Green",
    "buySellPrice": "$1000 / $1100",
    "tokens": "500",
    "missions": "5/5",
    "likes": "300",
    "shares":"100",
    "actions": "Details"
  }
]

    return (
      <div className="bg-white h-screen flex flex-col justify">
        <div className="flex">
          <h1 className="text-3xl p-4">Initiatives</h1>
        </div>

        <div className="p-4">
          <div className="flex flex-row items-center  place-content-between p-4">
            <div className="flex flex-row gap-4">
              <button className="text-sm font-semibold rounded-lg border p-3 w-[116px] text-color-1 border-color-1">Initiatives</button>
              <button className="text-sm font-semibold p-3">New Initiatives</button>
            </div>
            <div>

            <button className="flex items-center justify-center bg-color-5 text-white text-sm font-semibold p-3 w-[163px] gap-6 rounded-lg">
              <img src={sumIcon}/>Create
              </button>
            </div>
          </div>

        
        <div className="grid grid-cols-9 grid-rows-1 gap-0 bg-[#6193FF]/10 h-[68px] p-2">
            <div className="flex items-center m-auto text-sm font-semibold">Name</div>
            <div className="flex items-center m-auto text-sm font-semibold">Price Fluctuaction</div>
            <div className="flex items-center m-auto text-sm font-semibold">Colaborators</div>
            <div className="flex items-center m-auto text-sm font-semibold">Buy/Sell Price</div>
            <div className="flex items-center m-auto text-sm font-semibold">Tokens</div>
            <div className="flex items-center m-auto text-sm font-semibold">Missions</div>
            <div className="flex items-center m-auto text-sm font-semibold">Likes </div>
            <div className="flex items-center m-auto text-sm font-semibold">Shares</div>
            <div className="flex items-center m-auto text-sm font-semibold"></div>
        </div>
        {init.map((item, index) => (
          <div key={index} className="grid grid-cols-9 grid-rows-1 gap-0 h-[68px] p-2 border-b">
            <div className="flex items-center m-auto text-sm">{item.name}</div>
            <div className="flex items-center m-auto text-sm">{item.priceFluctuation}</div>
            <div className="flex items-center m-auto text-sm">{item.colaborator}</div>
            <div className="flex items-center m-auto text-sm">{item.buySellPrice}</div>
            <div className="flex items-center m-auto text-sm">{item.tokens}</div>
            <div className="flex items-center m-auto text-sm">{item.missions}</div>
            <div className="flex items-center m-auto text-sm">{item.likes}</div>
            <div className="flex items-center m-auto text-sm">{item.shares}</div>
            <div className="flex items-center m-auto text-sm flex-row gap-3">
              <button className="bg-[#00B2FF] text-white p-2 rounded-full w-[54px] h-[34px]">Buy</button>
              <button className="bg-color-1 text-white p-2 rounded-full w-[54px] h-[34px]">Join</button>
              <button className="m-1"><img src={likeIcon}/></button>
              <button className="m-1"><img src={shareIcon}/></button>
            </div>
          </div>
        ))}
        </div>
      </div>
    );
  };
  
  export default initiativas;
  