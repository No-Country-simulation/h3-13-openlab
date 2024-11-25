import { useDispatch , useSelector } from "react-redux";
import { sumIcon , likeIcon, shareIcon , flecha1 , flecha2} from "../../assets";
import MiniGraph from "../../components/graf/Mini";
import { openModal } from "../../store/Initiatives/createIniSlice";
import { useEffect , useState } from "react";
import { fetchInitiatives, setSortOrder } from "../../store/Initiatives/showInitiativesSlice";
import { AppDispatch } from "../../store/store";
import { selectInitiatives } from "../../store/Initiatives/showInitiativesSlice";
import SimpleBar from 'simplebar-react';
import "../../index.css"
import 'simplebar/dist/simplebar.min.css';
import useWindowSize from "../../components/hooks/Responsive";


const Initiativas = () => {
  // const { initiatives, loading, error, filter, sortOrder } = useSelector(selectInitiatives);
  const {sortOrder } = useSelector(selectInitiatives);
  const dispatch = useDispatch<AppDispatch>()

  const [searchTerm, setSearchTerm] = useState('');
  const [activeButton, setActiveButton] = useState("initiatives")
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  const initiatives = 
  [{
    "id":"5",
    "name": "CryptoStar",
    "priceFluctuation": [500, 510, 505, 520, 515],
    "colaborator": 123,
    "buySellPrice": "$500 / $520",
    "tokens": "150",
    "missions": "3/5",
    "likes": "120",
    "shares":"100",
    "createdAt": "2024-11-20T10:00:00Z"
  },
  {
    "id":"1",
    "name": "TokenFlow",
    "priceFluctuation": [100, 2000, 305, 420, 515],
    "colaborator": 523,
    "buySellPrice": "$1200 / $1150",
    "tokens": "300",
    "missions": "2/4",
    "likes": "85" ,
    "shares":"100",
    "createdAt": "2024-10-20T10:00:00Z"
  },
  {
    "id":"7",
    "name": "TokenFlow",
    "priceFluctuation": [100, 2000, 305, 420, 515],
    "colaborator": 523,
    "buySellPrice": "$1200 / $1150",
    "tokens": "300",
    "missions": "2/4",
    "likes": "85" ,
    "shares":"100",
    "createdAt": "2024-10-20T10:00:00Z"
  },
  {
    "id":"8",
    "name": "TokenFlow",
    "priceFluctuation": [100, 2000, 305, 420, 515],
    "colaborator": 523,
    "buySellPrice": "$1200 / $1150",
    "tokens": "300",
    "missions": "2/4",
    "likes": "85" ,
    "shares":"100",
    "createdAt": "2024-10-20T10:00:00Z"
  },
  {
    "id":"2",
    "name": "BlockStream",
    "priceFluctuation": [500, 510, 505, 520, 515],
    "colaborator": 111,
    "buySellPrice": "$750 / $800",
    "tokens": "200",
    "missions": "4/6",
    "likes": "200",
    "shares":"100",
    "createdAt": "2024-11-21T10:00:00Z"
  },
  {
    "id":"3",
    "name": "ChainSecure",
    "priceFluctuation": [500, 310, 205, 420, 515],
    "colaborator": 200,
    "buySellPrice": "$400 / $400",
    "tokens": "120",
    "missions": "1/3",
    "likes": "50" ,
    "shares":"100",
    "createdAt": "2024-09-20T10:00:00Z"
  },
  {
    "id":"4",
    "name": "EcoCoin",
    "priceFluctuation": [500, 410, 305, 220, 115],
    "colaborator": 400,
    "buySellPrice": "$1000 / $1100",
    "tokens": "500",
    "missions": "5/5",
    "likes": "300",
    "shares":"100",
    "createdAt": "2024-08-20T10:00:00Z"
  }
]

  const { width } = useWindowSize();

  const isMobile = width <= 768;

    function handleCreate(){
      dispatch(openModal())
    }

    // function handleJoin (){

    // }

    // function handleBuy (){

    // }

    // function handleLike(){

    // }

    const handleShare = (id: string) => {
      const initiativeUrl = `https://miaplicacion.com/initiative/${id}`;
      if (navigator.share) {
        navigator.share({
          title: 'Check this initiative!',
          url: initiativeUrl,
        });
      } else {
        alert('Share API is not supported on this device.');
      }
    };

    const handleSortOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setSortOrder(event.target.value as 'asc' | 'desc')); 
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    };

    const handleButtonClick = (button: 'initiatives' | 'newInitiatives') => {
      setActiveButton(button); 
    };

    const getFilteredInitiatives = () => {
      const currentDate = new Date();
      const oneWeekAgo = new Date(currentDate.setDate(currentDate.getDate() - 7));
  
      return initiatives.filter((initiative) => {
        const initiativeDate = new Date(initiative.createdAt);
        return initiativeDate >= oneWeekAgo; // Filtra las iniciativas creadas en los últimos 7 días
      });
    };

    const filteredInitiatives = activeButton === 'newInitiatives' ? getFilteredInitiatives() : initiatives;

    useEffect(() => {
      dispatch(fetchInitiatives());
    }, [dispatch]);


  const handleMenuToggle = (id:string) => {
    setMenuOpenId(menuOpenId === id ? null : id); 
  };
    
    // const filteredAndSortedInitiatives = initiatives
    // .filter((initiative) => {
    
    //   if (searchTerm && !initiative.name.toLowerCase().includes(searchTerm.toLowerCase())) {
    //     return false; 
    //   }
    // })
    // .sort((a, b) => {
    //   if (sortOrder === 'asc') {
    //     return a.name.localeCompare(b.name); 
    //   } else {
    //     return b.name.localeCompare(a.name);
    //   }
    // });

    return (

      <div className="bg-[#afafaf1a]/10 h-screen flex flex-col justify">
        {isMobile
        ? <>
        <div className="flex flex-row items-center justify-between m-4">
          <h1 className="text-3xl p-4 sm:w-full font-semibold">Initiatives</h1>
        <div>
          <button 
          className="flex items-center justify-center bg-color-5 text-white mr-5 text-sm font-semibold p-3  gap-6 rounded-lg"
          onClick={handleCreate}
          >
            <img src={sumIcon}/>Create
            </button>
        </div>

        </div>

      <div className="p-5">
        <div className="flex flex-col items-center bg-white p-1 rounded-lg ">
          <div className="flex flex-row gap-4 p-2">
            <button
                className={`text-sm font-semibold p-3 w-[116px] ${
                  activeButton === 'initiatives' ? 'text-color-1  border border-color-1 rounded-lg' : 'text-black'
                }`}
                onClick={() => handleButtonClick('initiatives')}
              >
                Initiatives
            </button>
            <button
              className={`text-sm font-semibold p-3 ${
                activeButton === 'newInitiatives' ? 'text-color-1  border border-color-1 rounded-lg' : 'text-black'
              }`}
              onClick={() => handleButtonClick('newInitiatives')}
            >
              New Initiatives
            </button>
          </div>
          
          <div className="flex flex-row justify items-center">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}  
              className="border border-black w-[8em] p-1 rounded-lg"
              onChange={handleSearchChange} 
              />

            <select
              value={sortOrder}
              onChange={handleSortOrderChange}
              className="border border-black rounded-lg p-1 ml-3"
            >
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>

          </div>
          
        </div>

      <div className="bg-white">
      
        {filteredInitiatives.map((item, index) => (
         <div key={index} className="flex flex-col gap-4 border-b p-4">

           <div className="flex flex-row items-center gap-4">
             <div className="flex items-center m-auto text-sm font-semibold">{item.name}</div>
             <div className="flex items-center m-auto text-sm">
               <MiniGraph data={item.priceFluctuation} color="#3D7BFF" />
             </div>
             <div className="flex items-center m-auto">
               <button onClick={() => handleMenuToggle(item.id)}>
                 <img src={menuOpenId === String(item.id) ? flecha1 : flecha2} />
                </button>
             </div>
           </div>

            {menuOpenId === String(item.id) && (
              <div className="mt-4 p-4 transition-all ease-in-out duration-300">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row items-center justify-between">
                    <div className="text-sm font-semibold">Colaborators</div>
                      <div className="bg-[#00B2FF]/20 rounded-lg p-1 w-[73px] text-center text-sm">
                        {item.colaborator}
                      </div>
                    </div>

                  <div className="flex flex-row items-center justify-between">
                    <div className="text-sm font-semibold">Buy/Sell Price</div>
                    <div className="text-[#00A065] font-semibold text-sm">
                        {item.buySellPrice}
                    </div>
                  </div>
        
                  <div className="flex flex-row items-center justify-between">
                    <div className="text-sm font-semibold">Tokens</div>
                    <div className="text-sm">{item.tokens}</div>                              
                  </div>
        
                  <div className="flex flex-row items-center justify-between">
                    <div className="text-sm font-semibold">Missions</div>
                    <div className="text-sm">{item.missions}</div>
                  </div>
        
                  <div className="flex flex-row items-center justify-between">
                    <div className="text-sm font-semibold">Likes</div>
                    <div className="text-sm">{item.likes}</div>
                  </div>

                  <div className="flex flex-row items-center justify-between">
                    <div className="text-sm font-semibold">Shares</div>
                    <div className="text-sm">{item.shares}</div>
                  </div>

                  <div className="flex flex-row items-center justify-between w-[262px] m-auto">
                    <button className="bg-[#00B2FF] text-white p-2 font-semibold rounded-full justify-center w-[83px] h-[34px] flex items-center">Buy</button>
                    <button className="bg-color-1 text-white p-2  font-semibold rounded-full  justify-center w-[83px] h-[34px] flex items-center">Join</button>
                    <button className=""
                      ><img src={likeIcon} className="h-[20px]"/></button>
                    <button className=""
                      onClick={()=>handleShare(item.id)}
                      ><img src={shareIcon} className="h-[20px]"/>
                    </button>
                  </div>
              </div>
            </div>
          )}
          </div>
        )
        )}
 
      </div> 
      </div> 
      </>

        // webApp
        : <><div className="flex">
        <h1 className="text-3xl p-4 sm:w-full">Initiatives</h1>
      </div>
      <div className="p-5">
        <div className="flex flex-row items-center  place-content-between p-4">
          <div className="flex flex-row gap-4">
        <button
            className={`text-sm font-semibold p-3 w-[116px]  ${
              activeButton === 'initiatives' ? 'text-color-1 shadow border border-color-1 rounded-lg' : 'text-black'
            }`}
            onClick={() => handleButtonClick('initiatives')}
          >
            Initiatives
        </button>
        <button
          className={`text-sm font-semibold p-3 ${
            activeButton === 'newInitiatives' ? 'text-color-1 shadow border border-color-1 rounded-lg' : 'text-black'
          }`}
          onClick={() => handleButtonClick('newInitiatives')}
        >
          New Initiatives
        </button>
          </div>
          
          <div className="flex flex-row justify">
          <input
            type="text"
            placeholder="Search for initiatives"
            value={searchTerm}  
            className="border p-1 rounded-lg mr-4 shadow"
            onChange={handleSearchChange} 
            />

          <select
            value={sortOrder}
            onChange={handleSortOrderChange}
            className="border  rounded-lg p-2 shadow"
          >
            <option value="asc"> Order A-Z</option>
            <option value="desc"> Order Z-A</option>
          </select>

          </div>
          
          <div>

          <button 
          className="flex items-center justify-center bg-color-5 text-white shadow mr-5 text-sm font-semibold p-3 w-[163px] gap-6 rounded-lg"
          onClick={handleCreate}
          >
            <img src={sumIcon}/>Create
            </button>
          </div>
        </div>

      <div className="m-1">
      <SimpleBar style={{ maxHeight: 500 }}>
        <div className="grid grid-cols-9 grid-rows-1 gap-0 bg-[#6193FF]/10 h-[68px] p-1 mr-5">
            <div className="flex items-center m-auto text-sm font-semibold">Name
            </div>
            <div className="flex items-center m-auto text-sm font-semibold">Price Fluctuaction</div>
            <div className="flex items-center m-auto text-sm font-semibold">Colaborators</div>
            <div className="flex items-center m-auto text-sm font-semibold">Buy/Sell Price</div>
            <div className="flex items-center m-auto text-sm font-semibold">Tokens</div>
            <div className="flex items-center m-auto text-sm font-semibold">Missions</div>
            <div className="flex items-center m-auto text-sm font-semibold">Likes </div>
            <div className="flex items-center m-auto text-sm font-semibold">Shares</div>
            <div className="flex items-center m-auto text-sm font-semibold">       </div>
        </div>

        {filteredInitiatives.map((item, index) => (
          <div key={index} className="grid grid-cols-9 grid-rows-1 gap-0 h-[68px] p-2 border-b  mr-5">
            <div className="flex items-center m-auto text-sm">{item.name}</div>
            <div className="flex items-center m-auto text-sm">   <MiniGraph data={item.priceFluctuation} color="#3D7BFF" /></div>
            <div className="flex items-center justify-center m-auto text-sm bg-[#00B2FF]/20 rounded-lg p-1 w-[73px]">{item.colaborator}</div>
            <div className="flex items-center text-[#00A065] font-semibold m-auto text-sm">{item.buySellPrice}</div>
            <div className="flex items-center m-auto text-sm">{item.tokens}</div>
            <div className="flex items-center m-auto text-sm">{item.missions}</div>
            <div className="flex items-center m-auto text-sm">{item.likes}</div>
            <div className="flex items-center m-auto text-sm">{item.shares}</div>
            <div className="flex items-center m-auto text-sm flex-row gap-2">
              <button className="bg-[#00B2FF] text-white p-2 rounded-full w-[54px] h-[34px] flex items-center">Buy</button>
              <button className="bg-color-1 text-white p-2 rounded-full w-[54px] h-[34px] flex items-center">Join</button>
              <button className="m-1"><img src={likeIcon} className="h-[20px]"/></button>
              <button className="m-1"
              onClick={()=>handleShare(item.id)}
              ><img src={shareIcon} className="h-[20px]"/>
              </button>
            </div>
          </div>
        ))}
 
      </SimpleBar>
      </div>
      </div> 
        
      </>}
      </div>
    );
  };

  
  export default Initiativas;
  