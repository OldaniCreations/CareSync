import React from 'react';

interface LabTrendSparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  showPoints?: boolean;
}

const LabTrendSparkline: React.FC<LabTrendSparklineProps> = ({
  data,
  width = 60,
  height = 20,
  color = '#007C9E',
  showPoints = false
}) => {
  if (!data || data.length < 2) {
    return (
      <svg width={width} height={height} className="lab-trend-sparkline">
        <text x="50%" y="50%" textAnchor="middle" dy="0.35em" fontSize="10" fill="#9ca3af">
          No data
        </text>
      </svg>
    );
  }

  // Calculate the path for the sparkline
  const padding = 2;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  
  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);
  const range = maxValue - minValue || 1; // Avoid division by zero
  
  const points = data.map((value, index) => {
    const x = padding + (index / (data.length - 1)) * chartWidth;
    const y = padding + chartHeight - ((value - minValue) / range) * chartHeight;
    return `${x},${y}`;
  });

  const pathData = `M ${points.join(' L ')}`;

  return (
    <svg width={width} height={height} className="lab-trend-sparkline">
      {/* Background */}
      <rect
        width={width}
        height={height}
        fill="transparent"
        rx="2"
      />
      
      {/* Sparkline path */}
      <path
        d={pathData}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Data points (optional) */}
      {showPoints && points.map((point, index) => {
        const [x, y] = point.split(',').map(Number);
        return (
          <circle
            key={index}
            cx={x}
            cy={y}
            r="1.5"
            fill={color}
            stroke="white"
            strokeWidth="0.5"
          />
        );
      })}
    </svg>
  );
};

export default LabTrendSparkline;
