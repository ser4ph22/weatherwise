// src/contexts/WeatherContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { fetchWeatherData, fetchForecast } from '../services/weatherApi';

const WeatherContext = createContext();

// Keep the hook in the same file to avoid circular dependencies
export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

export const WeatherProvider = ({ children }) => {
  const [unit, setUnit] = useState('C');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('weatherFavorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const fetchLocationWeather = async (location) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [weather, forecast] = await Promise.all([
        fetchWeatherData(location),
        fetchForecast(location)
      ]);
      
      setWeatherData(weather);
      setForecastData(forecast);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const addToFavorites = (location) => {
    if (!location) return;
    
    const normalizedLocation = location.trim().toLowerCase();
    
    setFavorites(prev => {
      if (prev.some(fav => fav.toLowerCase() === normalizedLocation)) {
        return prev;
      }
      return [...prev, location.trim()];
    });
  };

  const removeFromFavorites = (location) => {
    setFavorites(prev => 
      prev.filter(fav => fav.toLowerCase() !== location.toLowerCase())
    );
  };

  const toggleUnit = () => {
    setUnit(prevUnit => prevUnit === 'F' ? 'C' : 'F');
  };

  const value = {
    unit,
    toggleUnit,
    favorites,
    addToFavorites,
    removeFromFavorites,
    weatherData,
    forecastData,
    isLoading,
    error,
    fetchLocationWeather
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};

WeatherProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default WeatherProvider;