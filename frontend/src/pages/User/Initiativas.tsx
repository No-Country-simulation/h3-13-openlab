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
import ModalBuy from "../../components/buyInit/modalBuy";

interface Initiative {
  id: string;
  name: string;
  priceFluctuation: number[]; 
  colaborator: number;
  tokens: string; 
  missions: string;
  likes: string;
  shares: string;
  createdAt: string;
  img: string;
  idea: string;
  problem: string;
  solution: string;
  price: {
    buy: number;
    sell: number;
  };
}

const Initiativas = () => {
  const { initiatives, sortOrder } = useSelector(selectInitiatives);
  const dispatch = useDispatch<AppDispatch>()

  const [searchTerm, setSearchTerm] = useState('');
  const [activeButton, setActiveButton] = useState("initiatives")
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInitiative, setSelectedInitiative] = useState<Initiative | null>(null);


  const { width } = useWindowSize();

  const isMobile = width <= 768;

    function handleCreate(){
      dispatch(openModal())
    }

    
    const handleBuy = (initiative: Initiative) => {
      setSelectedInitiative(initiative);  
      setIsModalOpen(true);              
    };
    
    function handleJoin (){
    }

    function handleLike(){
    }

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

 // Función para obtener las iniciativas recientes (últimos 7 días)
 const getRecentInitiatives = () => {
  const currentDate = new Date();
  const oneWeekAgo = new Date(currentDate.setDate(currentDate.getDate() - 7));

  return initiatives.filter((initiative) => {
    const initiativeDate = new Date(initiative.createdAt);
    return initiativeDate >= oneWeekAgo;
  });
};

// Filtrar e incluir búsqueda y ordenación
const filteredAndSortedInitiatives = (activeButton === 'newInitiatives' ? getRecentInitiatives() : initiatives)
  .filter((initiative) => {
    if (searchTerm && !initiative.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  })
  .sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

// Manejar cambio de orden
const handleSortOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  dispatch(setSortOrder(event.target.value as 'asc' | 'desc'));
};

// Manejar cambio en la búsqueda
const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setSearchTerm(event.target.value);
};


const handleButtonClick = (button: 'initiatives' | 'newInitiatives') => {
  setActiveButton(button);
};

const handleMenuToggle = (id:string) => {
  setMenuOpenId(menuOpenId === id ? null : id); 
};

    useEffect(() => {
      dispatch(fetchInitiatives());
    }, [dispatch]);
    
        return (

      <div className="bg-[#afafaf1a]/10 h-screen flex flex-col justify">
        {isMobile
        ? <>
        <div className="flex flex-row items-center justify-between m-4">
        {isModalOpen && selectedInitiative && <ModalBuy initiative={selectedInitiative} onClose={() => setIsModalOpen(false)} />}

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
          
          <div className="flex flex-row justify items-center p-3">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}  
              className="border shadow w-[8em] p-1 rounded-lg"
              onChange={handleSearchChange} 
              />

            <select
              value={sortOrder}
              onChange={handleSortOrderChange}
              className="border shadow rounded-lg p-1 ml-3"
            >
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>

          </div>
          
        </div>

      <div className="bg-white">
      
        {filteredAndSortedInitiatives.map((item, index) => (
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
                        {item.price.buy +"/"+ item.price.sell}
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
                    <button 
                    className="bg-[#00B2FF] text-white p-2 font-semibold rounded-full justify-center w-[83px] h-[34px] flex items-center"
                    onClick={() => handleBuy(item)} 
                    >Buy</button>
                    <button 
                    className="bg-color-1 text-white p-2  font-semibold rounded-full  justify-center w-[83px] h-[34px] flex items-center"
                    onClick={handleJoin}
                    >Join</button>
                    <button 
                    className=""
                    onClick={handleLike}
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
        <div className="grid grid-cols-9 grid-rows-1 gap-0 bg-[#6193FF]/10 h-[68px] p-1 mr-5 shadow">
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

        {filteredAndSortedInitiatives.map((item, index) => (
          <div key={index} className="grid grid-cols-9 grid-rows-1 gap-0 h-[68px] p-2 border-b  mr-5">
            <div className="flex items-center m-auto text-sm">{item.name}</div>
            <div className="flex items-center m-auto text-sm">   <MiniGraph data={item.priceFluctuation} color="#3D7BFF" /></div>
            <div className="flex items-center justify-center m-auto text-sm bg-[#00B2FF]/20 rounded-lg p-1 w-[73px]">{item.colaborator}</div>
            <div className="flex items-center text-[#00A065] font-semibold m-auto text-sm"> {item.price.buy +"/"+ item.price.sell}</div>
            <div className="flex items-center m-auto text-sm">{item.tokens}</div>
            <div className="flex items-center m-auto text-sm">{item.missions}</div>
            <div className="flex items-center m-auto text-sm">{item.likes}</div>
            <div className="flex items-center m-auto text-sm">{item.shares}</div>
            <div className="flex items-center m-auto text-sm flex-row gap-2">
              <button 
              className="bg-[#00B2FF] text-white p-2 rounded-full w-[54px] h-[34px] flex items-center"
              onClick={() => handleBuy(item)} 
              >Buy</button>
              <button 
              className="bg-color-1 text-white p-2 rounded-full w-[54px] h-[34px] flex items-center"
              onClick={handleJoin}
              >Join</button>
              <button 
              className="m-1"
              onClick={handleLike}
              ><img src={likeIcon} className="h-[20px]"/></button>
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
  