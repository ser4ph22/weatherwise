import { useNavigate } from 'react-router-dom';
import { useWeather } from '../contexts/WeatherContext';
import { MapPin, X } from 'lucide-react';

const FavoritesList = () => {
  const navigate = useNavigate();
  const { favorites, fetchWeather, loading, removeFromFavorites } = useWeather();

  const handleFavoriteClick = async (favorite) => {
    if (loading) return;
    
    try {
      const searchQuery = favorite.name;
      if (searchQuery) {
        await fetchWeather(searchQuery);
        navigate('/weather', { replace: true });
      }
    } catch (error) {
      console.error('Error fetching favorite weather:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 sticky top-20">
      <h2 className="text-xl font-semibold mb-4">Favorites</h2>
      {!favorites || favorites.length === 0 ? (
        <p className="text-gray-500">No favorite locations added yet</p>
      ) : (
        <ul className="space-y-2">
          {favorites.map((favorite) => (
            <li
              key={favorite.id || `${favorite.name}-${favorite.region || ''}`}
              className="group relative flex items-center p-2 rounded-lg hover:bg-gray-50 
                       transition-colors"
            >
              <div 
                onClick={() => handleFavoriteClick(favorite)}
                className="flex items-center flex-grow cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                <div className="flex flex-col min-w-0">
                  <span className="font-medium truncate">{favorite.name}</span>
                  {favorite.region && (
                    <span className="text-sm text-gray-500 truncate">
                      {favorite.region}
                      {favorite.country && `, ${favorite.country}`}
                    </span>
                  )}
                </div>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromFavorites(favorite);
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity 
                         ml-2 p-1 hover:text-red-500 rounded-full hover:bg-red-50"
                aria-label={`Remove ${favorite.name} from favorites`}
                disabled={loading}
              >
                <X className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesList;