import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  acount,
  estadist,
  gas,
  newiniBlue,
  segurity,
  wallet,
  warning,
} from "../../assets";
import DashBar from "../../components/graf/dash";
import useWindowSize from "../../components/hooks/Responsive";
import SearchBar from "../../components/searchBar/searchDash";
import { TransactionsUser } from "../../components/transactions/transa";
import {
  useGetIniciativasQuery,
  useGetIniciativasUserQuery,
} from "../../store/api/apiSlice";
import { selectCurrentUser } from "../../store/auth/authSlice";

const Dashboard = () => {
  const { address, isConnected } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();
  const [balanceETH, setBalanceETH] = useState<string | null>(null);
  const [blockNumber, setBlockNumber] = useState<number | null>(null);
  const [gasPrice, setGasPrice] = useState<string | null>(null);
  const [networkName, setNetworkName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  //---------
  const { id: userId } = useSelector(selectCurrentUser);
  const { data: allInitiatives } = useGetIniciativasQuery(userId);
  const { data: myInitiatives } = useGetIniciativasUserQuery(userId);
  const { width } = useWindowSize();
  const isMobile = width <= 768;

  const fetchData = async () => {
    if (!window.ethereum) {
      console.error("MetaMask no está instalado.");
      return;
    }

    try {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = web3Provider.getSigner();
      const userAddress = await signer.getAddress();

      const network = await web3Provider.getNetwork();
      setNetworkName(network.name);

      const balanceInWei = await web3Provider.getBalance(userAddress);
      setBalanceETH(ethers.utils.formatEther(balanceInWei));

      const currentBlockNumber = await web3Provider.getBlockNumber();
      setBlockNumber(currentBlockNumber);

      const gasPriceInWei = await web3Provider.getGasPrice();
      setGasPrice(ethers.utils.formatUnits(gasPriceInWei, "gwei"));

      setIsLoading(false);
    } catch (error) {
      console.error("Error al inicializar el proveedor:", error);
    }
  };

  const lastTenInitiatives = allInitiatives?.slice(-10);
  const lastTenMyInitiatives = myInitiatives?.dataIterable.slice(-6);

  useEffect(() => {
    if (isConnected) {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [isConnected, address, chainId]);

  if (!allInitiatives || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center bg-gray-100 h-[40em]">
        <div className="w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin"></div>
        <p className="p-2">Cargando...</p>
      </div>
    );
  }

  return (
    <>
      {isMobile ? (
        <div className="flex flex-col  bg-[#afafaf1a]/10  gap-3">
          <div className="flex flex-col p-1">
            <h1 className="p-4 text-3xl">Dashboard</h1>
            <SearchBar />
          </div>
          {isConnected ? (
            <div className="flex flex-row items-center justify-evenly">
              <div className="w-[8em] h-[7em] bg-white shadow-lg border rounded-lg flex flex-col gap-1 p-3">
                <img src={wallet} alt="wallet" className="w-7" />
                <h3 className="italic font-semibold text-l">Balance</h3>
                <p>{balanceETH ? `${balanceETH} ETH` : "Cargando..."}</p>
              </div>

              <div className="w-[8em] h-[7em] bg-white shadow-lg rounded-lg border flex flex-col gap-1 p-3">
                <img src={segurity} alt="segurity" className="w-7" />
                <h3 className="italic font-semibold text-l">Bloque Nº</h3>
                <p>{blockNumber !== null ? blockNumber : "Cargando..."}</p>
              </div>
              <div className="w-[8em] h-[7em] bg-white shadow-lg rounded-lg border flex flex-col gap-1 p-3">
                <img src={gas} alt="gas" className="w-7" />
                <h3 className="italic font-semibold text-l">Gas Price</h3>
                <p>{gasPrice ? `${gasPrice}` : "Cargando..."}</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col w-[15em] m-auto h-[10em] bg-white shadow-lg rounded-lg content-center items-center justify-center gap-10">
              <img src={warning} alt="warning" className="w-20" />
              <h1>Por favor conecta tu billetera </h1>
            </div>
          )}
          <div className="h-[15em] m-auto bg-white shadow-lg border rounded-lg p-1">
            <div className="flex flex-row gap-5 mr-[5em]">
              <img src={estadist} alt="analitycs" className="w-8" />
              <Link to="/initiatives" className="content-end ">
                <h1 className="text-l font-semibold italic content-end mr-[5em]">
                  Iniciativas
                </h1>
              </Link>
            </div>
            <DashBar initiatives={lastTenInitiatives} />
          </div>
          <div className="flex flex-row justify-evenly ">
            <Link
              to="/iniciatives"
              className="p-4 font-semibold text-center bg-white border rounded-lg shadow-lg text-l "
            >
              Iniciativas
            </Link>
            <Link
              to="/Myiniciatives"
              className="p-4 font-semibold text-center bg-white border rounded-lg shadow-lg text-l "
            >
              Mis Iniciativas
            </Link>
          </div>
          .
          <TransactionsUser />
        </div>
      ) : (
        ////////////////////////WEB APP ///////////////////
        <div className="flex flex-col  bg-[#afafaf1a]/10 gap-4">
          <div className="flex flex-row justify-end w-full p-1">
            <div className="">
              <SearchBar />
            </div>
          </div>

          {!isConnected ? (
            <div className="flex flex-row w-[40em] m-auto h-[10em] bg-white shadow-lg rounded-lg content-center items-center justify-center gap-10">
              <img src={warning} alt="warning" className="w-20" />
              <h1>Por favor conecta tu billetera </h1>
            </div>
          ) : (
            <>
              <div className="flex flex-row items-center justify-evenly">
                <div className="w-[240px] h-[120px] bg-white shadow-lg border rounded-lg flex flex-col gap-1 p-3">
                  <img src={wallet} alt="wallet" className="w-10" />
                  <h3 className="italic font-semibold text-l">Balance</h3>
                  <p>{balanceETH ? `${balanceETH} ETH` : "Cargando..."}</p>
                </div>
                <div className="w-[240px] h-[120px] bg-white shadow-lg rounded-lg border flex flex-col gap-1 p-3">
                  <img src={segurity} alt="segurity" className="w-10" />
                  <h3 className="italic font-semibold text-l">
                    Número de Bloque
                  </h3>
                  <p>{blockNumber !== null ? blockNumber : "Cargando..."}</p>
                </div>
                <div className="w-[240px] h-[120px] bg-white shadow-lg rounded-lg border flex flex-col gap-1 p-3">
                  <img src={gas} alt="gas" className="w-10" />
                  <h3 className="italic font-semibold text-l">Gas Price</h3>
                  <p>{gasPrice ? `${gasPrice} Gwei` : "Cargando..."}</p>
                </div>
                <div className="w-[480px] h-[120px] bg-white shadow-lg rounded-lg border flex flex-col gap-1 p-3">
                  <div className="flex flex-row gap-5">
                    <img src={acount} alt="acount" className="w-10" />
                    <h1 className="content-end italic font-semibold text-l">
                      Información de la cuenta
                    </h1>
                  </div>
                  <div className="flex flex-col p-1 m-auto">
                    <p>
                      <strong className="italic text-l">Network:</strong>{" "}
                      {networkName ? networkName : "Cargando..."}
                    </p>
                    <p>
                      <strong className="italic text-l">Dirección:</strong>{" "}
                      {address ? address : "Cargando..."}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="flex flex-row items-center justify-evenly">
            <div className="h-[300px] w-[800px] bg-white shadow-lg border rounded-lg p-1">
              <div className="flex flex-row gap-5">
                <img src={estadist} alt="analitycs" className="w-8" />
                <Link to="/initiatives" className="content-end ">
                  <h1 className="text-l font-semibold italic content-end mr-[5em]">
                    Iniciativas
                  </h1>
                </Link>
              </div>
              <DashBar initiatives={lastTenInitiatives} />
            </div>

            <div className="h-[300px] w-[350px] bg-white shadow-lg border rounded-lg p-1">
              <div className="flex flex-row gap-5">
                <img src={newiniBlue} alt="initiatives" className="w-8 m-1" />
                <div className="content-end">
                  <h1 className="content-end mr-2 italic font-semibold text-l">
                    Mis Iniciativas
                  </h1>
                </div>
              </div>
              <ul className="flex flex-col p-2 ml-10">
                {myInitiatives?.dataIterable.length > 0 ? (
                  lastTenMyInitiatives.map((initiative: any, index: number) => (
                    <Link
                      key={index}
                      to={`/initiative/${initiative.id}`}
                      className="flex"
                    >
                      <img
                        src={initiative.imagen}
                        className="w-8 h-8 overflow-hidden rounded-full shadow"
                      />
                      <li key={initiative.id} className="p-2">
                        {initiative.nombre}
                      </li>
                    </Link>
                  ))
                ) : (
                  <li className="ml-[-3em] mt-4">
                    You have not created initiatives
                  </li>
                )}
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
