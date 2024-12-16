import { useEffect, useState } from "react";
import { fetchCryptoData } from "../../utils/fetchCryptoData";

const CryptoList = () => {
  const [cryptosData, setCryptosData] = useState<any>();

  useEffect(() => {
    const init = async () => {
      const data = await fetchCryptoData();
      setCryptosData(data);
    };

    init();

    // Configura el intervalo para que se ejecute cada 30 segundos
    const interval = setInterval(() => {
      init();
    }, 30000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, []);

  if (!cryptosData) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-100">
        <div className="w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin"></div>
        <p className="p-2">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="h-full p-7">
      {cryptosData?.map((crypto: any) => (
        <div key={crypto.id} className="flex items-center gap-3 scroll-py-5">
          <img
            src={crypto.image}
            alt={`${crypto.name} logo`}
            className="w-8 h-8"
          />
          <div className="flex items-center justify-between w-full">
            <div>
              <p className="font-medium">{crypto.name}</p>
              <p className="text-sm opacity-60">
                {crypto.symbol.toUpperCase()}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <p className="font-medium text-[#3A23FF]">
                {crypto.price_change_percentage_24h.toFixed(2)}%
              </p>
              <p className="text-sm text-color-2 opacity-60">
                $
                {crypto.current_price.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default CryptoList;
