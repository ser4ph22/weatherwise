const BASE_URL = import.meta.env.VITE_WEATHER_API_BASE_URL;
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchWeatherData = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=yes`
    );
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error.message || 'Failed to fetch weather data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const fetchForecast = async (city, days = 5) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=${days}&aqi=yes`
    );
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error.message || 'Failed to fetch forecast data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};

export const convertTemp = (temp, targetUnit) => {
  if (targetUnit === 'C') {
    return parseFloat(temp).toFixed(1);
  }
  // Convert Celsius to Fahrenheit
  return ((temp * 9/5) + 32).toFixed(1);
};

export const getWeatherCondition = (conditionData) => {
  if (!conditionData) return null;

  return {
    icon: conditionData.icon,
    text: conditionData.text
  };
};

export const getAstroTimes = (astro) => {
  if (!astro) return null;

  return {
    sunrise: astro.sunrise,
    sunset: astro.sunset,
    moonrise: astro.moonrise,
    moonset: astro.moonset,
    moonPhase: astro.moon_phase,
    moonIllumination: astro.moon_illumination
  };
};