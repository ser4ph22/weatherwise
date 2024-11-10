// src/pages/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeather } from '../contexts/WeatherContext';

const Home = () => {
  const navigate = useNavigate();
  const { fetchWeather, loading, error } = useWeather();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      await fetchWeather(searchQuery);
      setSearchQuery('');
      navigate('/weather', { replace: true });
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Welcome to WeatherWise
      </h1>
      <p className="text-gray-600 mb-8">
        Get accurate weather information for any location
      </p>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a city..."
            className="flex-1 p-2 border border-gray-300 rounded-lg 
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     disabled:bg-gray-50 disabled:cursor-not-allowed"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !searchQuery.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg 
                     hover:bg-blue-600 disabled:opacity-50 
                     disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
        {error && (
          <p className="mt-2 text-red-500 text-sm">{error}</p>
        )}
      </form>

      {/* Quick Tips */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Search Tips</h2>
          <ul className="text-gray-600 space-y-2">
            <li>• Enter a city name (e.g., "London")</li>
            <li>• Include country code (e.g., "Paris, FR")</li>
            <li>• Use postal codes (e.g., "10001")</li>
            <li>• Enter coordinates (e.g., "51.5,-0.13")</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Favorites</h2>
          <ul className="text-gray-600 space-y-2">
            <li>• Click the + icon to save locations</li>
            <li>• View saved locations in the sidebar</li>
            <li>• Quick access to favorite locations</li>
            <li>• Remove locations with one click</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;