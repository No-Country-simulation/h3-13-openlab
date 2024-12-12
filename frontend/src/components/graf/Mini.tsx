import { PriceFluctuation } from "../../store/Initiatives/showInitiativesSlice";

type MiniGraphProps = {
  data: PriceFluctuation[]; 
  color?: string;
};

const MiniGraph: React.FC<MiniGraphProps> = ({ data, color = "#4A90E2" }) => {
 
  const values = data.map((item) => item.value);
  const max = Math.max(...values);
  const min = Math.min(...values);

  const width = 100; 
  const height = 50; 


  const points = data
    .map((item, index) => {
      const x = (index / (data.length - 1)) * width; 
      const y = height - ((item.value - min) / (max - min)) * height; 
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} style={{ overflow: "visible" }}>

      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        points={points}
      />


      {data.map((item, index) => {
        const x = (index / (data.length - 1)) * width;
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