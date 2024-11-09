import PropTypes from 'prop-types';
import { useWeather } from '../contexts/WeatherContext';
import WeatherHeader from '../components/WeatherHeader';
import FavoritesList from '../components/FavoritesList';
import { 
  ThermometerIcon,
  Droplets,
  Wind,
  Cloud,
  Sun,
  CloudRain,
  Gauge,
  Navigation
} from 'lucide-react';

const WeatherMetric = ({ icon: Icon, label, value, unit }) => {
  return (
    <div className="flex items-start gap-3 bg-transparent">
      <Icon className="w-5 h-5 text-blue-400 mt-1" />
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <p className="text-gray-900 font-medium">
          {value}
          {unit && <span className="text-gray-500 text-sm ml-1">{unit}</span>}
        </p>
      </div>
    </div>
  );
};

WeatherMetric.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  unit: PropTypes.string
};

const WeatherDetails = () => {
  const { 
    weatherData, 
    unit, 
    isLoading, 
    favorites,
    addToFavorites,
    removeFromFavorites 
  } = useWeather();

  const MainContent = () => {
    if (isLoading) {
      return (
        <div className="animate-pulse space-y-6">
          <div className="h-32 bg-white/50 rounded-lg mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-20 bg-white/50 rounded-lg"></div>
            ))}
          </div>
        </div>
      );
    }

    if (!weatherData?.current) {
      return (
        <div className="text-center text-gray-500">
          Search for a city to see weather details
        </div>
      );
    }

    const weather = weatherData.current;
    const locationData = weatherData.location;
    const locationName = locationData.name;
    const isInFavorites = favorites.includes(locationName);

    const handleFavoriteToggle = () => {
      if (isInFavorites) {
        removeFromFavorites(locationName);
      } else {
        addToFavorites(locationName);
      }
    };

    return (
      <div className="space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">
                {locationData.name}, {locationData.region}
              </h1>
              <button
                onClick={handleFavoriteToggle}
                className={`px-3 py-1 rounded-md transition-all ${
                  isInFavorites 
                    ? 'bg-pink-100 text-pink-700 hover:bg-pink-200'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {isInFavorites ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>
            <p className="text-gray-500">
              {locationData.country} • Last updated: {weather.last_updated}
            </p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold text-blue-500">
              {unit === 'C' ? weather.temp_c : weather.temp_f}°{unit}
            </div>
            <p className="text-gray-600">{weather.condition.text}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-8">
          <WeatherMetric
            icon={ThermometerIcon}
            label="Feels Like"
            value={unit === 'C' ? weather.feelslike_c : weather.feelslike_f}
            unit={`°${unit}`}
          />
          <WeatherMetric
            icon={Droplets}
            label="Humidity"
            value={weather.humidity}
            unit="%"
          />
          <WeatherMetric
            icon={Wind}
            label="Wind"
            value={weather.wind_kph}
            unit="km/h"
          />
          <WeatherMetric
            icon={Gauge}
            label="Pressure"
            value={weather.pressure_mb}
            unit="mb"
          />
          <WeatherMetric
            icon={CloudRain}
            label="Precipitation"
            value={weather.precip_mm}
            unit="mm"
          />
          <WeatherMetric
            icon={Sun}
            label="UV Index"
            value={weather.uv}
          />
          <WeatherMetric
            icon={Navigation}
            label="Wind Direction"
            value={weather.wind_dir}
          />
          <WeatherMetric
            icon={Cloud}
            label="Cloud Cover"
            value={weather.cloud}
            unit="%"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <WeatherHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <FavoritesList />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-9">
            <MainContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;