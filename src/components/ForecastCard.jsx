import { useWeather } from '../contexts/WeatherContext';
import { CloudDrizzle, Cloud, Sun } from 'lucide-react';

const ForecastCard = () => {
  const { forecast, loading, unit } = useWeather();

  const getWeatherIcon = (condition) => {
    const conditionLower = condition?.toLowerCase() || '';
    
    if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return <CloudDrizzle className="w-6 h-6 text-blue-400" />;
    } else if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
      return <Sun className="w-6 h-6 text-yellow-400" />;
    }
    return <Cloud className="w-6 h-6 text-gray-400" />;
  };

  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 my-6">
      <h2 className="text-xl font-semibold mb-6">5 Day Forecast</h2>
      <div className="space-y-4">
        {forecast.slice(0, 5).map((day, index) => (
          <div key={index} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              {getWeatherIcon(day.day.condition.text)}
              <div className="text-lg font-medium">
                {Math.round(unit === 'C' ? day.day.avgtemp_c : day.day.avgtemp_f)}°{unit}
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-sm font-medium">
                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className="text-sm text-gray-500">
                {day.day.condition.text}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;