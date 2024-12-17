export const obtenerPreciosCripto = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1"
      );
      const data = await response.json();
  
      if (response.ok) {
        const preciosConImagenes = data.reduce((acc: any, coin: any) => {
          acc[coin.name] = {
            usd: coin.current_price,
            image: coin.image,
            symbol: coin.symbol,
            porcentage: coin.ath_change_percentage,
          };
          return acc;
        }, {});
  
        return preciosConImagenes;
      } else {
        throw new Error("Error al obtener los datos de las criptomonedas");
      }
    } catch (err: any) {
      throw new Error(err?.message || "Error desconocido");
    }
  };
  