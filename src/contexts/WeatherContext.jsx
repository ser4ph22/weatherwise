// src/contexts/WeatherContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { fetchWeatherData, fetchForecast } from '../services/weatherApi';

const WeatherContext = createContext();

// Helper function to generate unique IDs
const generateUniqueId = () => `fav-${Date.now()}-${Math.random().toString(36).slice(2)}`;

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState(() => {
    try {
      return localStorage.getItem('weatherUnit') || 'C';
    } catch {
      return 'C';
    }
  });
  
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem('weatherFavorites');
      const parsedFavorites = savedFavorites ? JSON.parse(savedFavorites) : [];
      // Ensure all favorites have IDs
      return parsedFavorites.map(fav => ({
        ...fav,
        id: fav.id || generateUniqueId()
      }));
    } catch {
      return [];
    }
  });

  const addToFavorites = useCallback((locationData) => {
    if (!locationData) return;
    
    setFavorites(prev => {
      // Ensure we have a proper location object
      const location = typeof locationData === 'string' 
        ? { name: locationData }
        : locationData;

      // Create a new favorite with guaranteed unique ID and all necessary data
      const newFavorite = {
        id: generateUniqueId(),
        timestamp: new Date().toISOString(),
        name: location.name,
        region: location.region || '',
        country: location.country || '',
        lastWeather: weatherData?.current ? {
          temp_c: weatherData.current.temp_c,
          temp_f: weatherData.current.temp_f,
          condition: weatherData.current.condition
        } : null
      };

      // Check for duplicates using name and region
      const isDuplicate = prev.some(fav => 
        fav.name === newFavorite.name && 
        fav.region === newFavorite.region
      );

      if (!isDuplicate) {
        const newFavorites = [...prev, newFavorite];
        localStorage.setItem('weatherFavorites', JSON.stringify(newFavorites));
        return newFavorites;
      }
      return prev;
    });
  }, [weatherData]);

  const removeFromFavorites = useCallback((locationToRemove) => {
    setFavorites(prev => {
      const newFavorites = prev.filter(fav => {
        if (typeof locationToRemove === 'string') {
          return fav.name !== locationToRemove;
        }
        return locationToRemove.id ? 
          fav.id !== locationToRemove.id : 
          !(fav.name === locationToRemove.name && fav.region === locationToRemove.region);
      });
      localStorage.setItem('weatherFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  const toggleUnit = useCallback(() => {
    setUnit(prev => {
      const newUnit = prev === 'C' ? 'F' : 'C';
      localStorage.setItem('weatherUnit', newUnit);
      return newUnit;
    });
  }, []);

  const fetchWeather = useCallback(async (city) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWeatherData(city);
      setWeatherData(data);
      
      // Update favorite weather data if this location is in favorites
      setFavorites(prev => {
        const updatedFavorites = prev.map(fav => {
          if (fav.name === data.location.name && 
              (!fav.region || fav.region === data.location.region)) {
            return {
              ...fav,
              region: data.location.region,
              country: data.location.country,
              lastWeather: {
                temp_c: data.current.temp_c,
                temp_f: data.current.temp_f,
                condition: data.current.condition
              },
              lastUpdated: new Date().toISOString()
            };
          }
          return fav;
        });
        localStorage.setItem('weatherFavorites', JSON.stringify(updatedFavorites));
        return updatedFavorites;
      });

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateFavoriteWeather = useCallback(async (favorite) => {
    if (!favorite?.name) return;

    try {
      const data = await fetchWeatherData(favorite.name);
      setFavorites(prev => {
        const updatedFavorites = prev.map(fav => {
          if (fav.id === favorite.id || 
              (fav.name === favorite.name && fav.region === favorite.region)) {
            return {
              ...fav,
              lastWeather: {
                temp_c: data.current.temp_c,
                temp_f: data.current.temp_f,
                condition: data.current.condition
              },
              lastUpdated: new Date().toISOString()
            };
          }
          return fav;
        });
        localStorage.setItem('weatherFavorites', JSON.stringify(updatedFavorites));
        return updatedFavorites;
      });
    } catch (error) {
      console.error(`Error updating favorite weather for ${favorite.name}:`, error);
    }
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        loading,
        error,
        unit,
        favorites,
        fetchWeather,
        toggleUnit,
        addToFavorites,
        removeFromFavorites,
        updateFavoriteWeather
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};