import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type PriceFluctuation = {
  date: string;
  value: number;
};

type DetailedGraphProps = {
  priceFluctuation: PriceFluctuation[];
};


const DetailedGraph: React.FC<DetailedGraphProps> = ({ priceFluctuation }) => {

  console.log(priceFluctuation)
  const maxValue = Math.max(...priceFluctuation.map((point) => point.value));

  const calculateTrendLine = (data: PriceFluctuation[]) => {
    const n = data.length;
    const sumX = data.reduce((sum, _, index) => sum + index, 0);
    const sumY = data.reduce((sum, point) => sum + point.value, 0);
    const sumXY = data.reduce((sum, point, index) => sum + index * point.value, 0);
    const sumX2 = data.reduce((sum, _, index) => sum + index * index, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    return data.map((_, index) => ({
      date: data[index].date,
      value: Math.round(slope * index + intercept), 
    }));
  };

  const trendLine = calculateTrendLine(priceFluctuation);

  const calculateMode = (data: PriceFluctuation[]) => {
    const frequency: Record<number, number> = {};
    data.forEach((point) => {
      frequency[point.value] = (frequency[point.value] || 0) + 1;
    });
    const maxFreq = Math.max(...Object.values(frequency));
    const mode = Number(Object.keys(frequency).find((key) => frequency[Number(key)] === maxFreq));
    return mode;
  };
  
  const modeValue = calculateMode(priceFluctuation);

  const sum = priceFluctuation.reduce((acc, curr) => acc + curr.value, 0);
  const mean = sum / priceFluctuation.length;

  return (
    <div style={{ width:500, height: 300 }}>
    {/* <div style={{ width:500, height: 300 }}> */}
      <ResponsiveContainer width="90%" height={250} >
        <LineChart
          data={priceFluctuation}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" />
          <YAxis
            ticks={Array.from({ length: Math.ceil(maxValue / 10) + 1 }, (_, index) => index * 10)}
            domain={[0, 'dataMax']}
            tickCount={Math.ceil(maxValue / 10) + 1}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            name="Precio final "
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            data={trendLine}
            dataKey="value"
            stroke="#FF4500"
            strokeDasharray="5 5"
            strokeWidth={2}
            name="Tendencia"
            dot={false}
          />
                    {/* Línea de Moda */}
          <Line
          type="monotone"
          dataKey={() => modeValue}
          stroke="#008000"
          strokeDasharray="3 3"
          strokeWidth={2}
          name="Moda"
          dot={false}
        />
          {/* Linea de Media */}
          <Line
            type="monotone"
            dataKey={() => mean} 
            stroke="#A9A9A9"
            strokeWidth={2} 
            name="Media"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DetailedGraph;
