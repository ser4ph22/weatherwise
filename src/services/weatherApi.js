// services/weatherApi.js
const BASE_URL = import.meta.env.VITE_WEATHER_API_BASE_URL;
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const weatherApi = {
  getCurrentWeather: async (location) => {
    const response = await fetch(
      `${BASE_URL}/current.json?key=${API_KEY}&q=${location}`
    );
    if (!response.ok) {
      throw new Error('Weather data fetch failed');
    }
    return response.json();
  },
  
  getForecast: async (location, days = 5) => {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=${days}`
    );
    if (!response.ok) {
      throw new Error('Forecast data fetch failed');
    }
    return response.json();
  },
  
  getHistorical: async (location, days = 7) => {
    const dates = Array.from({length: days}, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    });
    
    const historicalData = await Promise.all(
      dates.map(async (date) => {
        const response = await fetch(
          `${BASE_URL}/history.json?key=${API_KEY}&q=${location}&dt=${date}`
        );
        if (!response.ok) {
          throw new Error('Historical data fetch failed');
        }
        return response.json();
      })
    );
    
    return historicalData;
  }
};

// Named exports for direct function access
export const fetchWeatherData = async (location) => {
  return weatherApi.getCurrentWeather(location);
};

export const fetchForecast = async (location, days = 5) => {
  return weatherApi.getForecast(location, days);
};

export const fetchHistorical = async (location, days = 7) => {
  return weatherApi.getHistorical(location, days);
};