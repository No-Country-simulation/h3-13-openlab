
type MiniGraphProps = {
    data: number[]; 
    color?: string; 
  };
  
  const MiniGraph: React.FC<MiniGraphProps> = ({ data, color = "#4A90E2" }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const width = 100;
    const height = 30;
  
    const points = data
      .map((value: number, index: number) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - ((value - min) / (max - min)) * height;
        return `${x},${y}`;
      })
      .join(" ");
  
    return (
      <svg width={width} height={height}>
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={points}
        />
      </svg>
    );
  };
  
  export default MiniGraph;