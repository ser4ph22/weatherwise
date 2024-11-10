import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeather } from '../contexts/WeatherContext';
import { Search, Plus } from 'lucide-react';

const WeatherHeader = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const {
    unit,
    toggleUnit,
    addToFavorites,
    fetchWeather,
    loading,
    weatherData
  } = useWeather();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      try {
        await fetchWeather(searchQuery);
        setSearchQuery('');
        navigate('/weather', { replace: true });
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    }
  };

  const handleAddToFavorites = () => {
    // If we're on the weather page, add the current location
    if (weatherData?.location) {
      addToFavorites({
        name: weatherData.location.name,
        region: weatherData.location.region,
        country: weatherData.location.country,
        timestamp: new Date().toISOString()
      });
    } 
    // If we're on any other page and have a search query
    else if (searchQuery.trim()) {
      addToFavorites({
        name: searchQuery.trim(),
        timestamp: new Date().toISOString()
      });
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
              className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              WeatherWise
            </a>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 max-w-lg mx-4">
            <div className="relative">
              <Search 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
                aria-hidden="true"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a city..."
                className="w-full pl-10 pr-20 py-2 border border-gray-300 rounded-lg 
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          disabled:bg-gray-50 disabled:cursor-not-allowed"
                disabled={loading}
              />
              <button
                type="button"
                onClick={handleAddToFavorites}
                className={`absolute right-12 top-1/2 transform -translate-y-1/2 p-1 rounded-md transition-colors ${
                  searchQuery.trim() || weatherData?.location
                    ? 'text-gray-600 hover:text-blue-600'
                    : 'text-gray-300 cursor-not-allowed'
                }`}
                disabled={loading || (!searchQuery.trim() && !weatherData?.location)}
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </form>

          <button
            onClick={toggleUnit}
            className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors"
            aria-label={`Switch to °${unit === 'C' ? 'F' : 'C'}`}
          >
            °{unit}
          </button>
        </div>
      </div>
    </header>
  );
};

export default WeatherHeader;