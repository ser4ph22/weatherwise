import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeather } from '../contexts/WeatherContext';
import { Sun, X } from 'lucide-react';

const FavoritesList = () => {
  const navigate = useNavigate();
  const { favorites, removeFromFavorites, fetchLocationWeather } = useWeather();
  const [selectedCity, setSelectedCity] = useState(null);

  const handleCityClick = async (city) => {
    try {
      setSelectedCity(city);
      await fetchLocationWeather(city);
      navigate('/weather', { replace: true });
    } catch (error) {
      console.error('Error fetching weather for favorite city:', error);
      setSelectedCity(null);
    }
  };

  const handleRemove = (e, city) => {
    e.stopPropagation(); // Prevent triggering the city click
    removeFromFavorites(city);
  };

  return (
    <aside className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold mb-4">Favorites</h2>
      {favorites.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No favorite locations added yet
        </p>
      ) : (
        <div className="space-y-2">
          {favorites.map((city) => (
            <div
              key={city}
              onClick={() => handleCityClick(city)}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                selectedCity === city
                  ? 'bg-pink-100 hover:bg-pink-200'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Sun className={`w-5 h-5 ${
                  selectedCity === city ? 'text-pink-500' : 'text-gray-400'
                }`} />
                <span className={`${
                  selectedCity === city ? 'text-pink-900' : 'text-gray-700'
                }`}>
                  {city}
                </span>
              </div>
              <button
                onClick={(e) => handleRemove(e, city)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label={`Remove ${city} from favorites`}
              >
                <X className="w-4 h-4 text-gray-400 hover:text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
};

export default FavoritesList;