import { useWeather } from '../contexts/WeatherContext';
import PropTypes from 'prop-types';
import { Heart } from 'lucide-react';

const WeatherStat = ({ label, value }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-lg font-medium text-gray-900">{value}</p>
  </div>
);

WeatherStat.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
};

const formatLocation = (location) => {
  if (!location) return '';
  
  const parts = [];
  
  // Add city name
  if (location.name) parts.push(location.name);
  
  // Add region/state if available and different from name
  if (location.region && location.region !== location.name) {
    parts.push(location.region);
  }
  
  // Add country if available and different from both name and region
  if (location.country && 
      location.country !== location.name && 
      location.country !== location.region) {
    parts.push(location.country);
  }
  
  return parts.filter(Boolean).join(', ');
};

const formatDateTime = (timestamp) => {
  return new Date(timestamp).toLocaleString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short'
  });
};

const WeatherDetails = () => {
  const { 
    weatherData, 
    unit, 
    error, 
    addToFavorites, 
    removeFromFavorites, 
    favorites,
    loading 
  } = useWeather();

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Search for a location to see weather details</p>
      </div>
    );
  }

  const {
    location,
    current: {
      temp_c,
      temp_f,
      condition: { text: conditionText },
      feelslike_c,
      feelslike_f,
      humidity,
      wind_kph,
      pressure_mb,
      precip_mm,
      uv,
      wind_dir,
      cloud,
      last_updated
    }
  } = weatherData;

  const formattedLocation = formatLocation(location);
  const temp = unit === 'C' ? temp_c : temp_f;
  const feelsLike = unit === 'C' ? feelslike_c : feelslike_f;

  const isInFavorites = favorites.some(fav => {
    if (typeof fav === 'string') {
      return fav === location.name;
    }
    return fav.name === location.name && 
           (!fav.region || fav.region === location.region) && 
           (!fav.country || fav.country === location.country);
  });

  const handleFavoriteToggle = () => {
    if (isInFavorites) {
      removeFromFavorites({
        name: location.name,
        region: location.region,
        country: location.country
      });
    } else {
      addToFavorites({
        name: location.name,
        region: location.region,
        country: location.country,
        current: {
          temp_c,
          temp_f,
          condition: { text: conditionText }
        }
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">
              {formattedLocation}
            </h1>
            <button
              onClick={handleFavoriteToggle}
              disabled={loading}
              className={`inline-flex items-center px-4 py-1 rounded-full text-sm 
                         transition-all duration-200 gap-1
                         ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                         ${isInFavorites 
                           ? 'bg-pink-100 text-pink-600 hover:bg-pink-200'
                           : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                         }`}
              aria-label={isInFavorites ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart
                className={`w-4 h-4 ${isInFavorites ? 'fill-current' : 'stroke-current'}`}
              />
              {isInFavorites ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
          <p className="text-gray-600">
            Last updated: {formatDateTime(last_updated)}
          </p>
        </div>
        <div className="text-4xl font-bold text-blue-600">
          {temp}°{unit}
          <div className="text-lg font-normal text-gray-600 text-right">
            {conditionText}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <WeatherStat 
          label="Feels Like" 
          value={`${feelsLike}°${unit}`} 
        />
        <WeatherStat 
          label="Humidity" 
          value={`${humidity}%`} 
        />
        <WeatherStat 
          label="Wind" 
          value={`${wind_kph} km/h`} 
        />
        <WeatherStat 
          label="Pressure" 
          value={`${pressure_mb} mb`} 
        />
        <WeatherStat 
          label="Precipitation" 
          value={`${precip_mm} mm`} 
        />
        <WeatherStat 
          label="UV Index" 
          value={uv} 
        />
        <WeatherStat 
          label="Wind Direction" 
          value={wind_dir} 
        />
        <WeatherStat 
          label="Cloud Cover" 
          value={`${cloud}%`} 
        />
      </div>
    </div>
  );
};

export default WeatherDetails;