import { useEffect, useState } from "react";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState , AppDispatch } from "../../store/store";
import { acount, estadist, gas,newiniBlue, segurity, wallet, warning } from "../../assets";
import { fetchMyInitiatives } from "../../store/Initiatives/myIniSlice";
import { fetchInitiatives } from "../../store/Initiatives/showInitiativesSlice";
import DashBar from "../../components/graf/dash";
import SearchBar from "../../components/searchBar/searchDash";
import { useMediaQuery } from 'react-responsive';
import { TransactionsUser } from "../../components/transactions/transa";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { address, isConnected } = useAppKitAccount();
  const { caipNetwork } = useAppKitNetwork();
  const [balanceETH, setBalanceETH] = useState<string | null>(null);
  const [blockNumber, setBlockNumber] = useState<number | null>(null);
  const [gasPrice, setGasPrice] = useState<string | null>(null);
  const [networkName, setNetworkName] = useState<string | null>(null);
  const { myInitiatives } = useSelector((state: RootState) => state.myInitiatives);
  const { initiatives } = useSelector((state: RootState) => state.initiatives);
  const { user } = useSelector((state: RootState) => state.auth);
  const userId = user?.id ?? ""; 
  const dispatch = useDispatch<AppDispatch>();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const provider = caipNetwork ? new ethers.providers.JsonRpcProvider(caipNetwork.rpcUrls.default.http[0]) : null;
  const isDarkMode = useSelector ((state: any) => state.darkMode.isDarkMode);

  const fetchData = async () => {
    if (!address || !provider) return;

    try {
      const balanceInWei = await provider.getBalance(address);
      const balanceInEther = ethers.utils.formatEther(balanceInWei);
      setBalanceETH(balanceInEther);

      const currentBlockNumber = await provider.getBlockNumber();
      setBlockNumber(currentBlockNumber);

      const network = await provider.getNetwork();
      setNetworkName(network.name);

      const gasPriceInWei = await provider.getGasPrice();
      setGasPrice(ethers.utils.formatUnits(gasPriceInWei, "gwei"));
    } catch (error) {
      console.error("Error al obtener los datos", error);
    }
  };

  const lastTenInitiatives = initiatives.slice(-10);
  const lastTenMyInitiatives = myInitiatives.slice(-6);

  const isDataLoading = useSelector((state: RootState) => 
    state.myInitiatives.loading || state.initiatives.loading
  );
  
  useEffect(() => {
    dispatch(fetchInitiatives());
    if(userId) dispatch(fetchMyInitiatives(userId));
    if (isConnected) {
      fetchData();
    }
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [isConnected, address, caipNetwork]);
  
  if (loading || isDataLoading) {
    return (
      <div className="flex items-center flex-col justify-center h-[40em] bg-gray-100" style={{ backgroundColor: isDarkMode? "#3a3a3a" :""}}>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <p className="p-2">Cargando...</p>
      </div>
    );
  }

  return (
    <>
      {isMobile ? (
        <div className={`flex flex-col ${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-[#afafaf1a]/10'} gap-3 w-screen`}>
          <div className="flex flex-col p-1">
            <h1 className="text-3xl p-4">Dashboard</h1>
            <SearchBar />
          </div>
  
          {isConnected ? (
            <div className="flex flex-row justify-evenly items-center">
              <div className={`w-[8em] h-[7em] ${isDarkMode ? 'bg-[#3a3a3a]' : 'bg-white border'} shadow-lg  rounded-lg flex flex-col gap-1 p-3`}>
                <img src={wallet} alt="wallet" className="w-7" />
                <h3 className="text-l font-semibold italic">Balance</h3>
                <p>{balanceETH ? `${balanceETH} ETH` : "Cargando..."}</p>
              </div>
  
              <div className={`w-[8em] h-[7em] ${isDarkMode ? 'bg-[#3a3a3a]' : 'bg-white border'} shadow-lg rounded-lg flex flex-col gap-1 p-3`}>
                <img src={segurity} alt="segurity" className="w-7" />
                <h3 className="text-l font-semibold italic">Bloque Nº</h3>
                <p>{blockNumber !== null ? blockNumber : "Cargando..."}</p>
              </div>
              <div className={`w-[8em] h-[7em] ${isDarkMode ? 'bg-[#3a3a3a]' : 'bg-white border'} shadow-lg rounded-lg  flex flex-col gap-1 p-3`}>
                <img src={gas} alt="gas" className="w-7" />
                <h3 className="text-l font-semibold italic">Gas Price</h3>
                <p>{gasPrice ? `${gasPrice}` : "Cargando..."}</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col w-[20em] m-auto h-[10em] bg-white shadow-lg rounded-lg content-center items-center justify-center " style={{ backgroundColor: isDarkMode ? '#3a3a3a' : ''}}>
              <img src={warning} alt="warning" className="w-20" />
              <h1 className="p-2">Por favor conecta tu billetera </h1>
            </div>
          )}
  
          <div className={`h-[15em] m-auto ${isDarkMode ? 'bg-[#3a3a3a]' : 'bg-white border'} shadow-lg rounded-lg p-1`}>
            <div className="flex flex-row gap-5 mr-[5em]">
              <img src={estadist} alt="analitycs" className="w-8" />
              <Link to="/initiatives" className="content-end ">
                <h1 className="text-l font-semibold italic content-end mr-[5em]">Iniciativas</h1>
              </Link>
            </div>
            <DashBar initiatives={lastTenInitiatives} />
          </div>
  
          <div className="flex flex-row justify-evenly ">
            <Link
              to="/iniciatives"
              className={`p-4  shadow-lg rounded-lg text-l font-semibold text-center ${isDarkMode ? 'bg-[#3a3a3a]' : 'bg-white border'}`}
            >
              Iniciativas
            </Link>
            <Link
              to="/Myiniciatives"
              className={`p-4  shadow-lg rounded-lg text-l font-semibold text-center ${isDarkMode ? 'bg-[#3a3a3a]' : 'bg-white border'}`}
            >
              Mis Iniciativas
            </Link>
          </div>
  
          <TransactionsUser />
        </div>
      ) : (
        ////////////////////////WEB APP ///////////////////
        <div className={`flex flex-col ${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-[#afafaf1a]/10'} gap-4`}>
          <div className="flex flex-row p-1 justify-between">
            <h1 className="text-3xl p-4">Dashboard</h1>
            <div className="">
              <SearchBar />
            </div>
          </div>
  
          {!isConnected ? (
            <div className={`flex flex-row w-[40em] m-auto h-[10em] ${isDarkMode ? 'bg-[#3a3a3a]' : 'bg-white border'} shadow-lg rounded-lg content-center items-center justify-center gap-10`}>
              <img src={warning} alt="warning" className="w-20" />
              <h1>Por favor conecta tu billetera </h1>
            </div>
          ) : (
            <>
              <div className="flex flex-row justify-evenly items-center">
                <div className={`w-[240px] h-[120px] ${isDarkMode ? 'bg-[#3a3a3a]' : 'bg-white border'} shadow-lg  rounded-lg flex flex-col gap-1 p-3`}>
                  <img src={wallet} alt="wallet" className="w-10" />
                  <h3 className="text-l font-semibold italic">Balance</h3>
                  <p>{balanceETH ? `${balanceETH} ETH` : "Cargando..."}</p>
                </div>
                <div className={`w-[240px] h-[120px] ${isDarkMode ? 'bg-[#3a3a3a]' : 'bg-white border'} shadow-lg rounded-lg flex flex-col gap-1 p-3`}>
                  <img src={segurity} alt="segurity" className="w-10" />
                  <h3 className="text-l font-semibold italic">Número de Bloque</h3>
                  <p>{blockNumber !== null ? blockNumber : "Cargando..."}</p>
                </div>
                <div className={`w-[240px] h-[120px] ${isDarkMode ? 'bg-[#3a3a3a]' : 'bg-white border'} shadow-lg rounded-lg flex flex-col gap-1 p-3`}>
                  <img src={gas} alt="gas" className="w-10" />
                  <h3 className="text-l font-semibold italic">Gas Price</h3>
                  <p>{gasPrice ? `${gasPrice} Gwei` : "Cargando..."}</p>
                </div>
                <div className={`w-[480px] h-[120px] ${isDarkMode ? 'bg-[#3a3a3a]' : 'bg-white border'} shadow-lg rounded-lg flex flex-col gap-1 p-3`}>
                  <div className="flex flex-row gap-5">
                    <img src={acount} alt="acount" className="w-10" />
                    <h1 className="text-l font-semibold italic content-end">Información de la cuenta</h1>
                  </div>
                  <div className="p-1 m-auto flex flex-col">
                    <p>
                      <strong className="text-l italic">Network:</strong>{" "}
                      {networkName ? networkName : "Cargando..."}
                    </p>
                    <p>
                      <strong className="text-l italic">Dirección:</strong>{" "}
                      {address ? address : "Cargando..."}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
  
          <div className="flex flex-row justify-evenly items-center">
            <div className={`h-[300px] w-[800px] ${isDarkMode ? 'bg-[#3a3a3a]' : 'bg-white border'} shadow-lg rounded-lg p-1`}>
              <div className="flex flex-row gap-5">
                <img src={estadist} alt="analitycs" className="w-8" />
                <Link to="/initiatives" className="content-end ">
                  <h1 className="text-l font-semibold italic content-end mr-[5em]">Iniciativas</h1>
                </Link>
              </div>
              <DashBar initiatives={lastTenInitiatives} />
            </div>
  
            <div className={`h-[300px] w-[350px] ${isDarkMode ? 'bg-[#3a3a3a]' : 'bg-white border'} shadow-lg rounded-lg p-1`}>
              <div className="flex flex-row gap-5">
                <img src={newiniBlue} alt="initiatives" className="w-8 m-1" />
                <Link to="/MyInitiatives" className="content-end">
                  <h1 className="text-l font-semibold italic content-end mr-2">Mis Iniciativas</h1>
                </Link>
              </div>
              <ul className="p-2 flex flex-col ml-[6em]">
                {myInitiatives.length > 0
                  ? lastTenMyInitiatives.map((initiative: any) => (
                      <Link to={`/initiative/${initiative.id}`} className="flex flex-row">
                        <img src={initiative.logo} className="w-8 h-8 rounded-lg shadow" />
                        <li key={initiative.id} className="p-2">
                          {initiative.name}
                        </li>
                      </Link>
                    ))
                  : <li className="ml-[-3em] mt-4">You have not created initiatives</li>}
              </ul>
            </div>
          </div>
          <TransactionsUser />
        </div>
      )}
    </>
  );
  
};

export default Dashboard;
