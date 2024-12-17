import axios from "axios";

export const fetchCryptoData = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd", // Moneda base (puedes cambiarla a 'eur', 'ars', etc.)
          order: "market_cap_desc", // Ordenar por capitalización de mercado
          per_page: 20, // Número de criptos populares a traer
          page: 1, // Página de resultados
          sparkline: false, // Excluir datos de sparkline para simplificar
        },
      }
    );

    return response.data;
  } catch (err) {
    console.log("Error al cargar los datos de criptomonedas.", err);
  }
};

export const fetchEthereumData = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/ethereum"
    );

    return response.data;
  } catch (err) {
    console.log("Error al cargar los datos de criptomonedas.", err);
  }
};

export const fetchCryptoAddress = async () => {
  try {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map",
      {
        headers: {
          "X-CMC_PRO_API_KEY": "f2cc723f-62e6-46d1-8071-d2e1a4478355",
        },
      }
    );

    return response.data;
  } catch (err) {
    console.log("Error al cargar los datos de criptomonedas.", err);
  }
};
