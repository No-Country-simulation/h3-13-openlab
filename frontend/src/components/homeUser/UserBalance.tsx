import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { fetchEthereumData } from "../../utils/fetchCryptoData";
import GrafEther from "../graf/Cryptos/Etherium";

const UserBalance = () => {
  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();
  const [balance, setBalance] = useState("");
  const [ethereum, setEthereum] = useState<any>({});

  const balanceToETH = (
    parseFloat(balance) * ethereum?.market_data?.current_price?.usd
  ).toFixed(8);

  const getWalletInfo = async (account: string) => {
    try {
      const web3 = new Web3(window.ethereum);

      const ethereum = await fetchEthereumData();
      setEthereum(ethereum);

      // Obtener el balance
      const balance = await web3.eth.getBalance(account);
      const balanceToEther = web3.utils.fromWei(balance, "ether");

      setBalance(balanceToEther);
    } catch (error) {
      console.error("Error al obtener la información de la wallet:", error);
    }
  };

  useEffect(() => {
    // Si usamos Reown directamente guardamos el usuario
    const init = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });

          getWalletInfo(accounts[0]);
        } catch (error) {
          console.error("Error al solicitar las cuentas:", error);
        }
      } else {
        console.error("MetaMask no está instalado.");
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, chainId]);

  return (
    <div className="flex items-start p-5 justify-between w-[680px] h-[220px] rounded-2xl shadow-lg">
      <div className="flex flex-col w-1/2 h-full justify-evenly">
        <p className="text-xl font-medium">Estimated balance</p>
        <div className="flex items-end gap-5">
          <p className="text-xl font-semibold">{balance}</p>
          <p className="font-medium text-color-2">ETH</p>
        </div>
        <p>
          = $
          {parseFloat(balanceToETH).toLocaleString("en-US", {
            minimumFractionDigits: 8,
            maximumFractionDigits: 8,
          })}
        </p>
        <div className="flex items-end gap-10">
          <div className="flex gap-3">
            <img src={ethereum?.image?.small} alt="matic" />
            <div className="flex flex-col items-start">
              <p className="font-medium">{ethereum?.name}</p>
              <p className="text-sm uppercase text-color-2">
                {ethereum?.symbol}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-[#3A23FF] font-medium">
              {ethereum?.market_data?.price_change_percentage_24h.toFixed(2)}%
            </p>
            <p className="text-sm text-color-2">
              ${ethereum?.market_data?.current_price.usd.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-full">
        <GrafEther crypto="ethereum" />
      </div>
    </div>
  );
};

export default UserBalance;
