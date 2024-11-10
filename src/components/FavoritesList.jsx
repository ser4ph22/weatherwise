import { Link } from 'react-router-dom';
import { useWeather } from '../contexts/WeatherContext';
import { X } from 'lucide-react';

const FavoritesList = () => {
  const { favorites, removeFromFavorites, fetchLocationWeather } = useWeather();

  const handleFavoriteClick = async (location) => {
    await fetchLocationWeather(location);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Favorites</h2>
      {favorites.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No favorite locations added yet
        </p>
      ) : (
        <ul className="space-y-2">
          {favorites.map((location) => (
            <li 
              key={location}
              className="flex items-center justify-between group hover:bg-blue-50 rounded-md p-2 transition-colors"
            >
              <Link
                to="/weather"
                onClick={() => handleFavoriteClick(location)}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
              >
                <span className="text-lg">☀️</span>
                <span>{location}</span>
              </Link>
              <button
                onClick={() => removeFromFavorites(location)}
                className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity"
                aria-label={`Remove ${location} from favorites`}
              >
                <X size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesList;