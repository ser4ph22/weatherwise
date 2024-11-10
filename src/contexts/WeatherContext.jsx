import { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { createWeatherContext } from './weatherUtils';

const WeatherContext = createContext(createWeatherContext());

export function WeatherProvider({ children }) {
  const [weatherData, setWeatherData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('C');

  const toggleUnit = useCallback(() => {
    setUnit(prevUnit => prevUnit === 'C' ? 'F' : 'C');
  }, []);

  const fetchLocationWeather = useCallback(async (location) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_WEATHER_API_BASE_URL}/current.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${location}`
      );
      
      if (!response.ok) {
        throw new Error('Weather data not found');
      }
      
      const data = await response.json();
      setWeatherData(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addToFavorites = useCallback((location) => {
    setFavorites(prev => {
      if (!prev.includes(location)) {
        return [...prev, location];
      }
      return prev;
    });
  }, []);

  const removeFromFavorites = useCallback((location) => {
    setFavorites(prev => prev.filter(fav => fav !== location));
  }, []);

  const value = {
    weatherData,
    favorites,
    isLoading,
    error,
    unit,
    toggleUnit,
    fetchLocationWeather,
    addToFavorites,
    removeFromFavorites
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
}

WeatherProvider.propTypes = {
  children: PropTypes.node.isRequired
};

// Create a custom hook in the same file
export function useWeather() {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
}