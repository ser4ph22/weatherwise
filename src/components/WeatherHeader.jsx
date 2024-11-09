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
    fetchLocationWeather,
    isLoading 
  } = useWeather();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      try {
        await fetchLocationWeather(searchQuery);
        // Clear the search query after successful search
        setSearchQuery('');
        // Use navigate with replace to prevent back button issues
        navigate('/weather', { replace: true });
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    }
  };

  const handleAddToFavorites = (e) => {
    e.preventDefault(); // Prevent any form submission
    if (searchQuery.trim()) {
      addToFavorites(searchQuery.trim());
      // Optional: Show a success message
      console.log('Added to favorites:', searchQuery);
    }
  };

  return (
    <header className="bg-white shadow-sm">
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a city..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
              {isLoading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                </div>
              )}
            </div>
          </form>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleAddToFavorites}
              className={`p-2 rounded-md transition-colors ${
                searchQuery.trim() 
                  ? 'text-gray-600 hover:text-blue-600 hover:bg-blue-50' 
                  : 'text-gray-300 cursor-not-allowed'
              }`}
              aria-label="Add to favorites"
              disabled={isLoading || !searchQuery.trim()}
            >
              <Plus className="w-5 h-5" />
            </button>
            <button
              onClick={toggleUnit}
              className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors"
              disabled={isLoading}
            >
              °{unit}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default WeatherHeader;