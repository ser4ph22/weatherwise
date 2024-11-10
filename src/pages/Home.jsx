import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeather } from '../contexts/WeatherContext';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { fetchLocationWeather, isLoading } = useWeather();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      try {
        await fetchLocationWeather(searchQuery);
        navigate('/weather');
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Welcome to WeatherWise
      </h1>
      <p className="text-gray-600 mb-8">
        Get accurate weather information for any location
      </p>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter city name..."
            className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300"
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Quick Tips</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900">Search</h3>
            <p className="text-blue-800">
              Enter a city name, postal code, or coordinates
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900">Favorites</h3>
            <p className="text-blue-800">
              Click the + icon to save locations for quick access
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;