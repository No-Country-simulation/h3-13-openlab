import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { RootState } from "../../store/store";
import { items, profile } from "../../assets";
import { ethers } from "ethers";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import GrafEther from "../../components/graf/Cryptos/Etherium";
import { StatisticsProfile } from "../../components/stats/stadistics";
import { obtenerPreciosCripto } from "../../components/hooks/CryptoData";
import { CriptoBar } from "../../components/Profile/CriptoBar";
import { PurchaseSaleOrders } from "../../components/Profile/PurchaseSale";
import useWindowSize from "../../components/hooks/Responsive";

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { caipNetwork } = useAppKitNetwork();
  const { address, isConnected } = useAppKitAccount();
  const [balanceETH, setBalanceETH] = useState<string | null>(null);
  const provider = caipNetwork ? new ethers.providers.JsonRpcProvider(caipNetwork.rpcUrls.default.http[0]) : null;
  const isDarkMode = useSelector ((state: any) => state.darkMode.isDarkMode);
  const { width } = useWindowSize();
  const isMobile = width <= 768;

  const fetchData = async () => {
    if (!address || !provider) return;

    try {
      const balanceInWei = await provider.getBalance(address);
      const balanceInEther = ethers.utils.formatEther(balanceInWei);
      setBalanceETH(balanceInEther);
    } catch (error) {
      console.error("Error al obtener los datos", error);
    }
  };

  const [precios, setPrecios] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    if (isConnected) {
      fetchData();
    }
    const obtenerPrecios = async () => {
      try {
        const preciosConImagenes = await obtenerPreciosCripto(); 
        setPrecios(preciosConImagenes);
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false);
      }
    };
    obtenerPrecios();
  }, [isConnected, address, caipNetwork]);

  if (loading) {
    return <div className="flex items-center flex-col justify-center h-[40em] bg-gray-100" style={{ backgroundColor: isDarkMode? "#3a3a3a" :""}}>
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    <p className="p-2">Cargando...</p>
  </div>;
  }

  if (error) {
    return <div>Error:{error}</div>;
  }


  return ( <> {isMobile
    ?
  // Mobile
  <div className="bg-[#afafaf1a]/10 p-3 w-screen">
        <h1 className="text-3xl p-1">Profile</h1>
        <div className="p-3 flex flex-col bg-white shadow-lg rounded-lg w-screen" style={{ backgroundColor: isDarkMode? "#3a3a3a" :""}}>
          
          <div className="flex flex-row gap-3 m-[1em]">
            <img src={profile} alt="user" className="w-16" />
            <div className="flex flex-col">
              <h1 className="font-semibold">
                {user?.name} {user?.lastName}
              </h1>
              <h2>{user?.email}</h2>
            </div>
          </div>

          <div className="w-[25em] m-auto">
            <ul>
              {user?.tags.map((item) =>(
                <li className="flex flex-row m-3 text-lg font-semibold">
                  <img src={items} className="mr-4"/>
                  {item.role} at {item.dao}
                </li>
              ))}
            </ul>
          </div>
          <br/>

          <div className="flex flex-col ">
            <div className="flex flex-col gap-4 ">
              <div className="flex flex-col gap-3 p-1">
                <h1 className="text-lg font-semibold">Estimated balance</h1>
                <h2 className="font-semibold text-xl">{balanceETH} ETH</h2>
                <h3>= ${balanceETH && precios.Ethereum?.usd ? (parseFloat(balanceETH) / precios.Ethereum?.usd).toFixed(4) : 'Cargando...'}</h3>
                <div className="flex flex-row w-[22em] justify-between">
                  <div className="flex flex-row">
                    <img src={precios.Ethereum?.image} alt="crypto" className="w-9 h-9 m-2"/>
                    <span className="font-semibold">
                        Etherium
                        <h2 className="font-normal text-sm opacity-60">{precios.Ethereum?.symbol.toUpperCase()}</h2>
                    </span>
                  </div>
                  <div className="flex flex-col ">
                    <span className="font-semibold text-l text-color-1">{precios.Ethereum?.porcentage ? precios.Ethereum?.porcentage.toFixed(2)+"%" : 'Cargando...'}</span>
                    <span className="opacity-60">  ${precios.Ethereum?.usd?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <br/>
        <div className="flex flex-col">
          
          <CriptoBar/>
          <br/>
          <StatisticsProfile/>

        </div>
            <br/>
          <PurchaseSaleOrders/>
      </div>

    :
  //  WebApp
      <div className="bg-[#afafaf1a]/10 p-3">
        <h1 className="text-3xl p-1">Profile</h1>
        <div className="p-3 flex flex-col bg-white shadow-lg rounded-lg" style={{ backgroundColor: isDarkMode? "#3a3a3a" :""}}>
          <div className="flex flex-row gap-3 m-[1em]">
            <img src={profile} alt="user" className="w-16" />
            <div className="flex flex-col">
              <h1 className="font-semibold">
                {user?.name} {user?.lastName}
              </h1>
              <h2>{user?.email}</h2>
            </div>
          </div>

          <div className="flex flex-row justify-evenly">
            <div className="flex flex-row justify-around gap-4 ">
              <div className="flex flex-col gap-3 p-1">
                <h1 className="text-lg font-semibold">Estimated balance</h1>
                <h2 className="font-semibold text-xl">{balanceETH} ETH</h2>
                <h3>= ${balanceETH && precios.Ethereum?.usd ? (parseFloat(balanceETH) / precios.Ethereum?.usd).toFixed(4) : 'Cargando...'}</h3>
                <div className="flex flex-row w-[22em] justify-between">
                  <div className="flex flex-row">
                    <img src={precios.Ethereum?.image} alt="crypto" className="w-9 h-9 m-2"/>
                    <span className="font-semibold">
                        Etherium
                        <h2 className="font-normal text-sm opacity-60">{precios.Ethereum?.symbol.toUpperCase()}</h2>
                    </span>
                  </div>
                  <div className="flex flex-col ">
                    <span className="font-semibold text-l text-color-1">{precios.Ethereum?.porcentage ? precios.Ethereum?.porcentage.toFixed(2)+"%" : 'Cargando...'}</span>
                    <span className="opacity-60">  ${precios.Ethereum?.usd?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[25em] flex flex-col items-center">
              <GrafEther/>
            </div>
          <div className="w-[25em]">
            <ul>
              {user?.tags.map((item) =>(
                <li className="flex flex-row m-3 text-lg font-semibold">
                  <img src={items} className="mr-4"/>
                  {item.role} at {item.dao}
                </li>
              ))}
            </ul>
          </div>
          </div>
        </div>
          
        <div className="flex flex-row">
          
          <CriptoBar/>
          <StatisticsProfile/>

        </div>
            <br/>
          <PurchaseSaleOrders/>
      </div>
  }
  </>
  );
};

export default Profile;
