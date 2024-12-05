import { useDispatch , useSelector } from "react-redux";
import { sumIcon , likeIcon, shareIcon , flecha1 , flecha2, dislikeIcon, flechaAsc, flechaDsc} from "../../assets";
import MiniGraph from "../../components/graf/Mini";
import { openModal } from "../../store/Initiatives/createIniSlice";
import { useEffect , useState } from "react";
import { fetchInitiatives } from "../../store/Initiatives/showInitiativesSlice";
import { AppDispatch, RootState} from "../../store/store";
import SimpleBar from 'simplebar-react';
import "../../index.css"
import 'simplebar/dist/simplebar.min.css';
import useWindowSize from "../../components/hooks/Responsive";
import ModalBuy from "../../components/buyInit/modalBuy";
import { sendJoinLeave, sendLikeDislike, sendShare } from "../../store/Initiatives/joinLikesIniSlice";
const URL_DEL_FRONT = import.meta.env.URL_DEL_FRONT
import { useAppKitAccount } from "@reown/appkit/react";
import { toast } from "react-toastify";
import { Initiative } from "../../store/Initiatives/showInitiativesSlice";
import { Link } from "react-router-dom";

const Initiativas = () => {
  const { initiatives } = useSelector((state: RootState) => state.initiatives);
  const dispatch = useDispatch<AppDispatch>()

  const [searchTerm, setSearchTerm] = useState('');
  const [activeButton, setActiveButton] = useState("initiatives")
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInitiative, setSelectedInitiative] = useState<Initiative | null>(null);
  const joinedInitiatives = useSelector((state: RootState) => state.joinInitiatives.joinedInitiatives);
  const likedInitiatives = useSelector((state: RootState) => state.likeInitiatives.likedInitiatives);
  const { isConnected } = useAppKitAccount();
  const [sortState, setSortState] = useState({
    criteria: "name",
    order: "asc",
  });
  const { width } = useWindowSize();

  const isMobile = width <= 768;

    function handleCreate(){
      dispatch(openModal())
    }

    const handleBuy = (initiative: Initiative) => {
      setSelectedInitiative(initiative);  
      setIsModalOpen(true);              
    };
    
    function handleJoin(id: string) {
      const { isJoined } = checkIfLikeOrJoined(id); 
      if (isJoined) {
        dispatch(sendJoinLeave({ initiativeId: id, isJoined: false }));
      } else {
        dispatch(sendJoinLeave({ initiativeId: id, isJoined: true }));
      }
    }
    
    function handleLike(id: string) {
      const { isLiked } = checkIfLikeOrJoined(id); 

      if (isLiked) {
        dispatch(sendLikeDislike({ initiativeId: id, isLiked: false }));
      } else {
        dispatch(sendLikeDislike({ initiativeId: id, isLiked: true }));

      }
    }
    
    
    const checkIfLikeOrJoined = (id: string): { isLiked: boolean, isJoined: boolean } => {
      const isLiked = likedInitiatives.includes(id);
      const isJoined = joinedInitiatives.includes(id);
      return { isLiked, isJoined };
    };

    const handleShare = (id: string) => {
      const initiativeUrl = `${URL_DEL_FRONT}/initiatives/${id}`;
      if (navigator.share) {
        navigator.share({
          title: 'Check this initiative!',
          url: initiativeUrl,
        });
        dispatch(sendShare({isShare:true, initiativeId:id}))

      } else {
        toast.warning('Share API is not supported on this device.');
      }
    };

 // Función para obtener las iniciativas recientes (últimos 7 días)
 const getRecentInitiatives = () => {
  const currentDate = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(currentDate.getDate() - 7);

  return initiatives.filter((initiative) => {
    if (!initiative.createdAt) return false;
    const initiativeDate = new Date(initiative.createdAt);
    return initiativeDate >= oneWeekAgo;
  });
};

const filteredAndSortedInitiatives = (activeButton === 'newInitiatives' ? getRecentInitiatives() : initiatives)
.filter((initiative) => {
  if (searchTerm && !initiative.name.toLowerCase().includes(searchTerm.toLowerCase())) {
    return false;
  }
  return true;
})
.sort((a, b) => {
  let comparison = 0;

  switch (sortState.criteria) {
    case "name":
      comparison = a.name.localeCompare(b.name); 
      break;
    case "collaborator":
      comparison = a.colaborator - b.colaborator; 
      break;
    case "buy_price":
      comparison = a.buy_price - b.buy_price; 
      break;
    case "sell_price":
      comparison = a.sell_price - b.sell_price; 
      break;
    case "likes":
      comparison = a.likes - b.likes; 
      break;
    case "shares":
      comparison = a.shares.localeCompare(b.shares);
      break;
    default:
      break;
  }

  return sortState.order === "asc" ? comparison : -comparison;
})
  .map((item) => {
    const { isLiked, isJoined } = checkIfLikeOrJoined(item.id); 
    return { ...item, isLiked, isJoined };
  });

const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setSearchTerm(event.target.value);
};


const handleButtonClick = (button: 'initiatives' | 'newInitiatives') => {
  setActiveButton(button);
};

const handleMenuToggle = (id:string) => {
  setMenuOpenId(menuOpenId === id ? null : id); 
};

const handleSortClick = (criteria: string) => {

  if (sortState.criteria === criteria) {
    setSortState({
      ...sortState,
      order: sortState.order === "asc" ? "desc" : "asc",
    });
  } else {
    setSortState({
      criteria,
      order: "asc",
    });
  }
};

    useEffect(() => {
      // dispatch(fetchInitiatives());
      // const filtered = filterNewInitiatives(initiatives); 
      // setNewInitiatives(filtered);
    }, [dispatch]);
    
        return (

      <div className="bg-[#afafaf1a]/10 flex flex-col justify">
        {isMobile
        ? <>
        <div className="flex flex-row items-center justify-between m-4">
        {isModalOpen && selectedInitiative && <ModalBuy initiative={selectedInitiative} onClose={() => setIsModalOpen(false)} />}

          <h1 className="text-3xl p-4 sm:w-full font-semibold">Initiatives</h1>
        <div>
          {isConnected?
          <button 
          className="flex items-center justify-center bg-color-5 text-white mr-5 text-sm font-semibold p-3  gap-6 rounded-lg"
          onClick={handleCreate}>
            <img src={sumIcon}/>Create
            </button>
          : <button 
          className="flex items-center justify-center bg-[#E0E0E0] text-black mr-5 text-sm font-semibold p-3  gap-6 rounded-lg"
          onClick={()=>{toast.info('Please connect the wallet first')}}>
            <img src={sumIcon}/>Create
            </button>
            }
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
          
          <div className="flex flex-row justify items-center p-3">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}  
              className="border shadow w-[8em] p-1 rounded-lg"
              onChange={handleSearchChange} 
              />
          </div>
          
        </div>

      <div className="bg-white">
      
        {filteredAndSortedInitiatives.map((item, index) => (
         <div key={index} className="flex flex-col gap-4 border-b p-4">

           <div className="flex flex-row items-center gap-4">
             <div className="flex items-center m-auto text-sm font-semibold text-center">
              <Link to={`/initiative/${item.id}`}>{item.name}</Link></div>
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
                        {item.buy_price +"/"+ item.sell_price}
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
                    {isConnected?
                    <button 
                    className="bg-[#00B2FF] text-white p-2 font-semibold rounded-full justify-center w-[83px] h-[34px] flex items-center shadow"
                    onClick={() => handleBuy(item)} 
                    >Buy</button>
                    : 
                    <button 
                    className="bg-[#E0E0E0] text-black p-2 font-semibold rounded-full justify-center w-[83px] h-[34px] flex items-center shadow" 
                    onClick={()=>{toast.info('Please connect the wallet first')}}
                    >Buy</button>
                    }

                    {
                      item.isJoined
                      ?<button 
                      className="bg-[#E0E0E0] text-black p-2 font-semibold rounded-full  justify-center w-[83px] h-[34px] flex items-center shadow"
                      onClick={()=>handleJoin(item.id)}
                      >Join</button> 
                      :<button 
                      className="bg-color-1 text-white p-2  font-semibold rounded-full  justify-center w-[83px] h-[34px] flex items-center shadow"
                      onClick={()=>handleJoin(item.id)}
                      >Join</button>
                    }
                    <button 
                    className=""
                    onClick={()=>handleLike(item.id)}
                    >
                     <img src={item.isLiked ? likeIcon: dislikeIcon} className="h-[20px]"/>
                    </button>
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

        ///////////////////////////////////////// webApp
        : <>
        <div className="flex">
        {isModalOpen && selectedInitiative && <ModalBuy initiative={selectedInitiative} onClose={() => setIsModalOpen(false)} />}
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
            placeholder="Search initiatives ..."
            value={searchTerm}  
            className="border p-1 rounded-lg mr-4 shadow"
            onChange={handleSearchChange} 
            />

          </div>
          
          <div>

          {isConnected?
          <button 
          className="flex items-center justify-center bg-color-5 text-white shadow mr-5 text-sm font-semibold p-3 w-[163px] gap-6 rounded-lg"
          onClick={handleCreate}>
            <img src={sumIcon}/>Create 
            </button>
          : <button 
          className="flex items-center justify-center bg-[#E0E0E0] text-black shadow mr-5 text-sm font-semibold p-3 w-[163px] gap-6 rounded-lg"
           onClick={()=>{toast.info('Please connect the wallet first')}}>
            <img src={sumIcon}/>Create
            </button>
            }
          </div>
        </div>

      <div className="m-1">
      <SimpleBar style={{ maxHeight: 500 }}>
        <div className="grid grid-cols-9 grid-rows-1 gap-0 bg-[#6193FF]/10 h-[68px] p-1 mr-8 shadow">
            <div 
            className="flex items-center m-auto text-sm font-semibold cursor-pointer"
            onClick={() => handleSortClick("name")}
            > Name {sortState.criteria === "name" && (<img
              src={sortState.order === "asc" ? flechaAsc : flechaDsc}
              alt="Sort Order"
              className="w-4 h-4 ml-2 transition-transform duration-300 ease-in-out transform"
              style={{
                  transform: sortState.order === 'asc' ? 'rotate(0deg)' : 'rotate(360deg)',
                   }}
              />)}
            </div>
            <div className="flex items-center m-auto text-sm font-semibold">Price Fluctuaction</div>
            <div 
              className="flex items-center m-auto text-sm font-semibold cursor-pointer"
              onClick={() => handleSortClick("collaborator")}
            >
              Colaborators {sortState.criteria === "collaborator" && (<img
              src={sortState.order === "asc" ? flechaAsc : flechaDsc}
              alt="Sort Order"
              className="w-4 h-4 ml-2 transition-transform duration-300 ease-in-out transform"
              style={{
                  transform: sortState.order === 'asc' ? 'rotate(0deg)' : 'rotate(360deg)',
                  }}
              />)}
            </div>
            <div className="flex items-center m-auto text-sm font-semibold gap-1">
                 <div  onClick={() => handleSortClick("buy_price")} className="flex flex-row cursor-pointer">
                     Buy  {sortState.criteria === "buy_price" && (<img
                        src={sortState.order === "asc" ? flechaAsc : flechaDsc}
                        alt="Sort Order"
                        className="w-4 h-4 ml-2 transition-transform duration-300 ease-in-out transform"
                        style={{
                                transform: sortState.order === 'asc' ? 'rotate(0deg)' : 'rotate(360deg)',
                                    }}
                                />)} 
                        </div>
                        /
                        <div  onClick={() => handleSortClick("sell_price")}  className="flex flex-row cursor-pointer">
                            Sell  {sortState.criteria === "sell_price" && (<img
                              src={sortState.order === "asc" ? flechaAsc : flechaDsc}
                              alt="Sort Order"
                              className="w-4 h-4 ml-2 transition-transform duration-300 ease-in-out transform"
                              style={{
                                      transform: sortState.order === 'asc' ? 'rotate(0deg)' : 'rotate(360deg)',
                                      }}
                                    />)}
                            </div>
                  </div>
            <div className="flex items-center m-auto text-sm font-semibold">Tokens</div>
            <div className="flex items-center m-auto text-sm font-semibold">Missions</div>
            <div 
            className="flex items-center m-auto text-sm font-semibold cursor-pointer"
            onClick={() => handleSortClick("likes")}>Likes {sortState.criteria === "likes" && (<img
              src={sortState.order === "asc" ? flechaAsc : flechaDsc}
              alt="Sort Order"
              className="w-4 h-4 ml-2 transition-transform duration-300 ease-in-out transform"
              style={{
                  transform: sortState.order === 'asc' ? 'rotate(0deg)' : 'rotate(360deg)',
                  }}
              />)}</div>
            <div 
            className="flex items-center m-auto text-sm font-semibold cursor-pointer cursor-pointer"
                onClick={() => handleSortClick("shares")}>Shares {sortState.criteria === "shares" && (<img
                    src={sortState.order === "asc" ? flechaAsc : flechaDsc}
                    alt="Sort Order"
                    className="w-4 h-4 ml-2 transition-transform duration-300 ease-in-out transform"
                    style={{
                            transform: sortState.order === 'asc' ? 'rotate(0deg)' : 'rotate(360deg)',
                            }}
                      />)}</div>
            <div className="flex items-center m-auto text-sm font-semibold">       </div>
        </div>

        {filteredAndSortedInitiatives.map((item, index) => (
          <div key={index} className="grid grid-cols-9 grid-rows-1 gap-0 h-[68px] p-2 border-b mr-8">
            <div className="flex items-center m-auto text-sm text-center">
            <Link to={`/initiative/${item.id}`}>{item.name}</Link></div>
            <div className="flex items-center m-auto text-sm">   <MiniGraph data={item.priceFluctuation} color="#3D7BFF" /></div>
            <div className="flex items-center justify-center m-auto text-sm bg-[#00B2FF]/20 rounded-lg p-1 w-[73px]">{item.colaborator}</div>
            <div className="flex items-center text-[#00A065] font-semibold m-auto text-sm"> {item.buy_price +"/"+ item.sell_price}</div>
            <div className="flex items-center m-auto text-sm">{item.tokens}</div>
            <div className="flex items-center m-auto text-sm">{item.missions}</div>
            <div className="flex items-center m-auto text-sm">{item.likes}</div>
            <div className="flex items-center m-auto text-sm">{item.shares}</div>
            <div className="flex items-center m-auto text-sm flex-row gap-2">
              {isConnected
              ? <button 
              className="bg-[#00B2FF] text-white p-2 rounded-full w-[54px] h-[34px] flex items-center shadow"
              onClick={() => handleBuy(item)} 
              >Buy</button>
      
              :<button 
              className="bg-[#E0E0E0] text-black p-2 rounded-full w-[54px] h-[34px] flex items-center shadow"
              onClick={()=>{toast.info('Please connect the wallet first')}}
              >Buy</button>
              }

              {
                item.isJoined
                ?<button 
                className="bg-[#E0E0E0] text-white p-2 rounded-full w-[54px] h-[34px] flex items-center shadow"
                onClick={()=>handleJoin(item.id)}
                >Join</button> 
                :<button 
                className="bg-color-1 text-white p-2 rounded-full w-[54px] h-[34px] flex items-center shadow"
                onClick={()=>handleJoin(item.id)}
                >Join</button>
              }
              <button 
              className="m-1"
              onClick={()=>handleLike(item.id)}
              ><img src={item.isLiked ? likeIcon: dislikeIcon} className="h-[20px]"/>
              </button>
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
  