type GraphProps = {
    data: number[];
    color?: string;
    width?: number; 
    height?: number; 
  };
  
  const Graph: React.FC<GraphProps> = ({
    data,
    color = "#4A90E2",
    width = 300, 
    height = 100, 
  }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
  
    const points = data
      .map((value: number, index: number) => {
        const x = (index / (data.length - 1)) * width; 
        const y = height - ((value - min) / (max - min)) * height; 
        return `${x},${y}`;
      })
      .join(" ");
  
    return (
      <div className="graph-container">
        <svg width={width} height={height}>
          <polyline
            fill="none"
            stroke={color}
            strokeWidth="2"
            points={points}
          />
        </svg>
      </div>
    );
  };
  
  export default Graph;
  