import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const value = {
    weatherData,
    setWeatherData,
    favorites,
    setFavorites,
    loading,
    setLoading,
    error,
    setError
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

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};
