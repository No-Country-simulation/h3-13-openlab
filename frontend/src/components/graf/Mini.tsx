import { PriceFluctuation } from "../../store/Initiatives/showInitiativesSlice";

/* type MiniGraphProps = {
  data: PriceFluctuation[]; 
  color?: string;
}; */

const MiniGraph = ({ color = "#4A90E2" }) => {
  const priceFluctuation = [
    { date: "2024-11-22", value: 15 },
    { date: "2024-11-23", value: 2 },
    { date: "2024-11-24", value: 89 },
    { date: "2024-11-25", value: 45 },
    { date: "2024-11-26", value: 60 },
    { date: "2024-11-27", value: 35 },
    { date: "2024-11-28", value: 40 },
    { date: "2024-11-29", value: 85 },
    { date: "2024-11-30", value: 30 },
    { date: "2024-12-01", value: 55 },
  ];

  const values = priceFluctuation.map((item) => item.value);
  const max = Math.max(...values);
  const min = Math.min(...values);

  const width = 100;
  const height = 50;

  const points = priceFluctuation
    .map((item, index) => {
      const x = (index / (priceFluctuation.length - 1)) * width;
      const y = height - ((item.value - min) / (max - min)) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} style={{ overflow: "visible" }}>
      <polyline fill="none" stroke={color} strokeWidth="2" points={points} />

      {priceFluctuation.map((item, index) => {
        const x = (index / (priceFluctuation.length - 1)) * width;
        const y = height + 10;
        return (
          <text
            key={item.date}
            x={x}
            y={y}
            fontSize="8"
            textAnchor="middle"
            fill="#555"
          >
            {/* {new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} */}
          </text>
        );
      })}
    </svg>
  );
};

export default MiniGraph;
