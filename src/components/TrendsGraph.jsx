import { useWeather } from '../contexts/WeatherContext';
import { useMemo } from 'react';

const TrendsGraph = () => {
  const { trends, unit } = useWeather();

  const processedData = useMemo(() => {
    if (!trends || trends.length === 0) return null;

    // Convert temperatures based on unit
    const convertedData = trends.map(data => ({
      ...data,
      temperature: unit === 'C' 
        ? data.temperature 
        : (data.temperature * 9/5) + 32
    }));

    const maxTemp = Math.max(...convertedData.map(t => t.temperature));
    const minTemp = Math.min(...convertedData.map(t => t.temperature));
    const range = maxTemp - minTemp || 1;

    return {
      points: convertedData.map((data, index) => ({
        x: index * (100 / (convertedData.length - 1)),
        y: ((data.temperature - minTemp) / range) * 80,
        ...data
      })),
      maxTemp,
      minTemp
    };
  }, [trends, unit]);

  if (!processedData) return null;

  // Create SVG path for the line
  const createLinePath = () => {
    return processedData.points
      .map((point, index) => {
        if (index === 0) return `M ${point.x},${100 - point.y}`;
        
        // Create a smooth curve
        const prevPoint = processedData.points[index - 1];
        const cx1 = (prevPoint.x + point.x) / 2;
        const cx2 = cx1;
        return `C ${cx1},${100 - prevPoint.y} ${cx2},${100 - point.y} ${point.x},${100 - point.y}`;
      })
      .join(' ');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Weather Trends</h2>
      <div className="relative h-64">
        {/* Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between border-l border-gray-100">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-full border-t border-gray-100 h-0"
            />
          ))}
        </div>
        
        {/* SVG for line and points */}
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          {/* Gradient for the line */}
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="1" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.5" />
            </linearGradient>
          </defs>

          {/* Line path with gradient */}
          <path
            d={createLinePath()}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            className="transition-all duration-300"
          />

          {/* Points */}
          {processedData.points.map((point, index) => (
            <g key={index}>
              {/* Pulse effect */}
              <circle
                cx={point.x}
                cy={100 - point.y}
                r="4"
                className="fill-blue-200 animate-pulse"
              />
              {/* Main point */}
              <circle
                cx={point.x}
                cy={100 - point.y}
                r="3"
                className="fill-blue-500"
              />
            </g>
          ))}
        </svg>

        {/* Labels */}
        <div className="absolute bottom-0 w-full flex justify-between">
          {processedData.points.map((point, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-sm text-gray-600 mt-4">{point.time}</div>
              <div className="text-sm font-medium">
                {Math.round(point.temperature)}°{unit}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendsGraph;