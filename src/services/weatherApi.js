/**
 * Weather API Service
 * Handles all weather data fetching and processing
 */

const BASE_URL = import.meta.env.VITE_WEATHER_API_BASE_URL;
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

// Cache configuration
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes
const weatherCache = new Map();

// Rate limiting configuration
const RATE_LIMIT_RESET = 60 * 1000; // 1 minute
let requestCount = 0;
let lastReset = Date.now();

/**
 * Reset rate limit counter if enough time has passed
 */
const checkRateLimit = () => {
  const now = Date.now();
  if (now - lastReset > RATE_LIMIT_RESET) {
    requestCount = 0;
    lastReset = now;
  }
  if (requestCount >= 30) { // 30 requests per minute limit
    throw new Error('Rate limit exceeded. Please try again later.');
  }
  requestCount++;
};

/**
 * Format location string for API requests
 */
const formatLocationQuery = (location) => {
  if (typeof location !== 'string') {
    throw new Error('Location must be a string');
  }
  return encodeURIComponent(location.trim());
};

/**
 * Check cache for existing data
 */
const checkCache = (key) => {
  const cached = weatherCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  weatherCache.delete(key);
  return null;
};

/**
 * Handle API errors
 */
const handleApiError = (error, endpoint) => {
  console.error(`Error in ${endpoint}:`, error);
  if (error.response) {
    const status = error.response.status;
    switch (status) {
      case 401:
        throw new Error('Invalid API key. Please check your configuration.');
      case 403:
        throw new Error('API key has exceeded its rate limit or has been disabled.');
      case 404:
        throw new Error('Location not found. Please check the city name and try again.');
      case 429:
        throw new Error('Too many requests. Please try again later.');
      default:
        throw new Error(`Weather service error: ${error.message || 'Unknown error occurred'}`);
    }
  }
  throw error;
};

/**
 * Fetch current weather data
 */
export const fetchWeatherData = async (city) => {
  try {
    checkRateLimit();
    const formattedCity = formatLocationQuery(city);
    const cacheKey = `current_${formattedCity}`;
    
    const cached = checkCache(cacheKey);
    if (cached) return cached;

    const response = await fetch(
      `${BASE_URL}/current.json?key=${API_KEY}&q=${formattedCity}&aqi=yes`
    );
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error.message || 'Failed to fetch weather data');
    }
    
    const data = await response.json();
    
    // Format location data
    if (data.location) {
      data.location.displayName = [
        data.location.name,
        data.location.region,
        data.location.country,
        data.location.postcode
      ].filter(Boolean).join(', ');
    }

    // Cache the result
    weatherCache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
    
    return data;
  } catch (error) {
    handleApiError(error, 'fetchWeatherData');
  }
};

/**
 * Fetch forecast data
 */
export const fetchForecast = async (city, days = 5) => {
  try {
    checkRateLimit();
    const formattedCity = formatLocationQuery(city);
    const cacheKey = `forecast_${formattedCity}_${days}`;
    
    const cached = checkCache(cacheKey);
    if (cached) return cached;

    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${formattedCity}&days=${days}&aqi=yes`
    );
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error.message || 'Failed to fetch forecast data');
    }
    
    const data = await response.json();
    
    // Process forecast data
    if (data.forecast && data.forecast.forecastday) {
      data.forecast.forecastday = data.forecast.forecastday.map(day => ({
        ...day,
        date: new Date(day.date).toLocaleDateString(),
        astro: getAstroTimes(day.astro)
      }));
    }

    // Cache the result
    weatherCache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
    
    return data;
  } catch (error) {
    handleApiError(error, 'fetchForecast');
  }
};

/**
 * Convert temperature between units
 */
export const convertTemp = (temp, targetUnit, precision = 1) => {
  if (typeof temp !== 'number') {
    temp = parseFloat(temp);
    if (isNaN(temp)) return '0';
  }
  
  if (targetUnit === 'C') {
    return temp.toFixed(precision);
  }
  // Convert Celsius to Fahrenheit
  return ((temp * 9/5) + 32).toFixed(precision);
};

/**
 * Get weather condition details
 */
export const getWeatherCondition = (conditionData) => {
  if (!conditionData) return null;

  return {
    icon: conditionData.icon,
    text: conditionData.text,
    code: conditionData.code
  };
};

/**
 * Get astronomical data
 */
export const getAstroTimes = (astro) => {
  if (!astro) return null;

  return {
    sunrise: astro.sunrise,
    sunset: astro.sunset,
    moonrise: astro.moonrise,
    moonset: astro.moonset,
    moonPhase: astro.moon_phase,
    moonIllumination: parseInt(astro.moon_illumination, 10)
  };
};

/**
 * Format wind data
 */
export const formatWindData = (speed_kph, direction) => {
  return {
    speed: parseFloat(speed_kph).toFixed(1),
    direction,
    description: `${direction} at ${parseFloat(speed_kph).toFixed(1)} km/h`
  };
};

/**
 * Get air quality description
 */
export const getAirQualityDescription = (aqi) => {
  const index = Math.floor(aqi);
  if (index <= 50) return 'Good';
  if (index <= 100) return 'Moderate';
  if (index <= 150) return 'Unhealthy for Sensitive Groups';
  if (index <= 200) return 'Unhealthy';
  if (index <= 300) return 'Very Unhealthy';
  return 'Hazardous';
};

/**
 * Clear weather cache
 */
export const clearWeatherCache = () => {
  weatherCache.clear();
};