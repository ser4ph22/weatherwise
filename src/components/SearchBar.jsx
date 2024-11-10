import { useState } from 'react';
import { Search, Loader } from 'lucide-react';
import { useWeather } from '../contexts/WeatherContext';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const { fetchWeather, loading } = useWeather();
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!query.trim() || loading) return;

    try {
      await fetchWeather(query.trim());
      setQuery('');
      navigate('/weather', { replace: true });
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="relative">
        {loading ? (
          <Loader 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 animate-spin" 
            size={20}
          />
        ) : (
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            size={20}
          />
        )}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="w-full pl-10 pr-16 py-2 rounded-lg border border-gray-200 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   transition-all duration-200 
                   disabled:bg-gray-50 disabled:cursor-not-allowed"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={!query.trim() || loading}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 
                   px-3 py-1 rounded-md bg-blue-500 text-white text-sm
                   hover:bg-blue-600 transition-colors duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed
                   disabled:hover:bg-blue-500"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;