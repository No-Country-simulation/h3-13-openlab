import { useEffect, useState } from "react";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState , AppDispatch } from "../../store/store";
import { acount, estadist, gas, historial, line, newiniBlue, segurity, wallet, warning } from "../../assets";
import { fetchMyInitiatives } from "../../store/Initiatives/myIniSlice";
import { fetchInitiatives } from "../../store/Initiatives/showInitiativesSlice";
import DashBar from "../../components/graf/dash";
import SearchBar from "../../components/searchBar/searchDash";

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
  const dispatch = useDispatch<AppDispatch>();

  const provider = caipNetwork ? new ethers.providers.JsonRpcProvider(caipNetwork.rpcUrls.default.http[0]) : null;

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
    dispatch(fetchMyInitiatives());
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
      <div className="flex items-center flex-col justify-center h-[40em] bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <p className="p-2">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col  bg-[#afafaf1a]/10 gap-4">
      <div className="flex flex-row p-1 justify-between">
        <h1 className="text-3xl p-4">Dashboard</h1>
        <div className="">
          <SearchBar/>
        </div>
      </div>

      {!isConnected ? (
        <div className="flex flex-row w-[40em] m-auto h-[10em] bg-white shadow-lg rounded-lg content-center items-center justify-center gap-10">
          <img src={warning} alt="warning" className="w-20" />
          <h1>Por favor conecta tu billetera </h1>
        </div>
      ) : (
        <>
          <div className="flex flex-row justify-evenly items-center">
            <div className="w-[240px] h-[120px] bg-white shadow-lg border rounded-lg flex flex-col gap-1 p-3">
              <img src={wallet} alt="wallet" className="w-10" />
              <h3 className="text-l font-semibold italic">Balance</h3>
              <p>{balanceETH ? `${balanceETH} ETH` : "Cargando..."}</p>
            </div>
            <div className="w-[240px] h-[120px] bg-white shadow-lg rounded-lg border flex flex-col gap-1 p-3">
              <img src={segurity} alt="segurity" className="w-10" />
              <h3 className="text-l font-semibold italic">Número de Bloque</h3>
              <p>{blockNumber !== null ? blockNumber : "Cargando..."}</p>
            </div>
            <div className="w-[240px] h-[120px] bg-white shadow-lg rounded-lg border flex flex-col gap-1 p-3">
              <img src={gas} alt="gas" className="w-10" />
              <h3 className="text-l font-semibold italic">Gas Price</h3>
              <p>{gasPrice ? `${gasPrice} Gwei` : "Cargando..."}</p>
            </div>
            <div className="w-[480px] h-[120px] bg-white shadow-lg rounded-lg border flex flex-col gap-1 p-3">
              <div className="flex flex-row gap-5">
                <img src={acount} alt="acount" className="w-10" />
                <h1 className="text-l font-semibold italic content-end">
                  Información de la cuenta
                </h1>
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

        <div className="h-[300px] w-[800px] bg-white shadow-lg border rounded-lg p-1">
          <div className="flex flex-row gap-5">
            <img src={estadist} alt="analitycs" className="w-8" />
            <Link to="/initiatives"  className="content-end ">
            <h1 className="text-l font-semibold italic content-end mr-[5em]">Iniciativas</h1>
            </Link>
          </div>
            <DashBar initiatives={lastTenInitiatives} />
        </div>

        <div className="h-[300px] w-[350px] bg-white shadow-lg border rounded-lg p-1">
          <div className="flex flex-row gap-5">
            <img src={newiniBlue} alt="initiatives" className="w-8 m-1" />
            <Link to="/MyInitiatives" className="content-end">
              <h1 className="text-l font-semibold italic content-end mr-2">Mis Iniciativas</h1>
            </Link>
          </div>
          <ul className="p-2 flex flex-col ml-[6em]">
            {lastTenMyInitiatives.length > 0
            ?lastTenMyInitiatives.map((initiative: any) => (
              <Link to={`/initiative/${initiative.id}`} className="flex flex-row">
                <img src={initiative.logo} className="w-8 h-8 rounded-lg shadow"/>
                <li key={initiative.id} className="p-2">
                {initiative.name}
              </li>
              </Link>
            ))
            :<li>Aun no has creado Iniciativas</li>}
          </ul>
        </div>
      </div>

        <div className="flex flex-col items-center">
            <div className="flex flex-col w-[80em] h-[10em] bg-white shadow rounded-lg p-1">
              <div className="flex flex-row gap-5 mb-[1em] p-1">
                  <img src={historial} alt="Historial" className="w-10 h-10"/>
                  <h1 className="text-l font-semibold italic content-end mr-[5em]">Últimas transacciones realizadas</h1>
              </div>

              <div className="flex flex-row justify-evenly">
                <div className="flex flex-col w-[35em]">
                  <h1 className="text-l font-semibold bg-color-1/20 text-center">Compras </h1>
                  <div className="flex flex-row bg-color-1/10 justify-evenly italic">
                    <h1>Fecha</h1><img src={line} className="h-[1.7em]"/>
                    <h1>Detalle</h1><img src={line} className="h-[1.7em]"/>
                    <h1>Estado</h1>
                  </div>
                  <p className="m-1">No se han realizado transacciones en los últimos 30 dias </p>
                </div>
              
                <div className="flex flex-col w-[35em]">
                  <h1 className="text-l font-semibold bg-color-1/20 text-center">Ventas</h1>
                  <div className="flex flex-row bg-color-1/10 justify-evenly italic">
                    <h1>Fecha</h1><img src={line} className="h-[1.7em]"/>
                    <h1>Detalle</h1><img src={line} className="h-[1.7em]"/>
                    <h1>Estado</h1>
                    </div>
                  <p className="m-1">No se han realizado transacciones en los últimos 30 dias </p>
                </div>
              </div>

            </div>
          </div>
    </div>
  );
};

export default Dashboard;
