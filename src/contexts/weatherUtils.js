// weatherUtils.js
export const createWeatherContext = (initialState = {}) => {
    return {
      weatherData: null,
      favorites: [],
      isLoading: false,
      error: null,
      unit: 'C',
      ...initialState
    };
  };