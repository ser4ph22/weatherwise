import React from 'react';
import { useWeather } from '../contexts/WeatherContext';

const TemperatureToggle = () => {
  const { unit, toggleUnit } = useWeather();

  return (
    <button
      onClick={toggleUnit}
      className="temperature-toggle"
      aria-label={`Switch to ${unit === 'C' ? 'Fahrenheit' : 'Celsius'}`}
    >
      °{unit}
    </button>
  );
};

export default TemperatureToggle;