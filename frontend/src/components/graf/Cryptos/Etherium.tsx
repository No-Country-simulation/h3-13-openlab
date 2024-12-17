import { useState, useEffect } from "react";
import { LineChart, Line, CartesianGrid, ResponsiveContainer } from "recharts";

type GraphEtherProps = {
  crypto: string;
};

const GrafEther: React.FC<GraphEtherProps> = ({ crypto }) => {
  const [precios, setPrecios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerPreciosHistoricos = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${crypto}/market_chart?vs_currency=usd&days=7&interval=daily`
        );
        const data = await response.json();
        if (response.ok) {
          const preciosHistoricos = data.prices.map(
            (item: [number, number]) => ({
              fecha: new Date(item[0]).toLocaleDateString(),
              precio: item[1],
            })
          );

          setPrecios(preciosHistoricos);
        } else {
          throw new Error("Error al obtener los datos históricos");
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    obtenerPreciosHistoricos();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div style={{ width: 257, height: 172 }}>
      <ResponsiveContainer>
        <LineChart data={precios}>
          <CartesianGrid strokeDasharray="1 1" />
          <Line type="monotone" dataKey="precio" stroke="#8884d8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GrafEther;
