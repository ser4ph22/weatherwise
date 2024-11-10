import { useWeather } from '../contexts/WeatherContext';
import PropTypes from 'prop-types';

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

const WeatherDetails = () => {
  const { weatherData, unit, error, addToFavorites, removeFromFavorites, favorites } = useWeather();

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
    location: { name, region, country },
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
      cloud
    }
  } = weatherData;

  const temp = unit === 'C' ? temp_c : temp_f;
  const feelsLike = unit === 'C' ? feelslike_c : feelslike_f;
  const isInFavorites = favorites.includes(name);

  const handleFavoriteToggle = () => {
    if (isInFavorites) {
      removeFromFavorites(name);
    } else {
      addToFavorites(name);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">
              {name}, {region || country}
            </h1>
            <button
              onClick={handleFavoriteToggle}
              className={`px-4 py-1 rounded-full text-sm transition-colors ${
                isInFavorites 
                  ? 'bg-pink-100 text-pink-600 hover:bg-pink-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isInFavorites ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleString()}
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
        <WeatherStat label="Feels Like" value={`${feelsLike}°${unit}`} />
        <WeatherStat label="Humidity" value={`${humidity}%`} />
        <WeatherStat label="Wind" value={`${wind_kph} km/h`} />
        <WeatherStat label="Pressure" value={`${pressure_mb} mb`} />
        <WeatherStat label="Precipitation" value={`${precip_mm} mm`} />
        <WeatherStat label="UV Index" value={uv} />
        <WeatherStat label="Wind Direction" value={wind_dir} />
        <WeatherStat label="Cloud Cover" value={`${cloud}%`} />
      </div>
    </div>
  );
};

export default WeatherDetails;