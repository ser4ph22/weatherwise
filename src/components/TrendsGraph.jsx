import { useWeather } from '../contexts/WeatherContext';

const TrendsGraph = () => {
  const { trends, unit } = useWeather();

  if (!trends || trends.length === 0) return null;

  const maxTemp = Math.max(...trends.map(t => t.temperature));
  const minTemp = Math.min(...trends.map(t => t.temperature));
  const range = maxTemp - minTemp || 1;

  const points = trends.map((data, index) => ({
    x: index * (100 / (trends.length - 1)),
    y: ((data.temperature - minTemp) / range) * 80,
    ...data
  }));

  // Create SVG path for the line
  const createLinePath = () => {
    return points
      .map((point, index) => 
        `${index === 0 ? 'M' : 'L'} ${point.x} ${100 - point.y}`
      )
      .join(' ');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Weather Trends</h2>
      <div className="relative h-64">
        {/* Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-full border-t border-gray-200" />
          ))}
        </div>
        
        {/* SVG for line and points */}
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <path
            d={createLinePath()}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
          />
          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={100 - point.y}
              r="3"
              className="fill-blue-500"
            />
          ))}
        </svg>

        {/* Labels */}
        <div className="absolute bottom-0 w-full flex justify-between">
          {points.map((point, index) => (
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