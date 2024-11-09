import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeather } from '../contexts/WeatherContext';
import { Search } from 'lucide-react';
import WeatherHeader from '../components/WeatherHeader';
import FavoritesList from '../components/FavoritesList';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { fetchLocationWeather, isLoading } = useWeather();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      try {
        await fetchLocationWeather(searchQuery);
        navigate('/weather', { replace: true });
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <WeatherHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar with Favorites */}
          <div className="lg:col-span-3">
            <FavoritesList />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome to WeatherWise
              </h1>
              <p className="text-gray-600 mb-8">
                Get accurate weather information for any location
              </p>

              <form onSubmit={handleSearch} className="max-w-xl">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter city name..."
                    className="w-full pl-10 pr-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                  {isLoading && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent"></div>
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="mt-4 w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                  disabled={isLoading || !searchQuery.trim()}
                >
                  {isLoading ? 'Searching...' : 'Search'}
                </button>
              </form>

              {/* Quick Tips */}
              <div className="mt-12">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Tips</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-900 mb-2">Search</h3>
                    <p className="text-blue-800 text-sm">
                      Enter a city name, postal code, or coordinates
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-900 mb-2">Favorites</h3>
                    <p className="text-blue-800 text-sm">
                      Click the + icon to save locations for quick access
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;