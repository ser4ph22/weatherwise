const ForecastCard = () => {
    const forecast = [
      { day: 'Mon', icon: '☀️', temp: '70°F' },
      { day: 'Tue', icon: '☁️', temp: '71°F' },
      { day: 'Wed', icon: '🌧️', temp: '72°F' },
      { day: 'Thu', icon: '☀️', temp: '73°F' },
      { day: 'Fri', icon: '☁️', temp: '74°F' }
    ];
  
    return (
      <div className="bg-blue-50 p-6 rounded-xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">5-Day Forecast</h2>
        <div className="flex justify-between">
          {forecast.map(({ day, icon, temp }) => (
            <div key={day} className="text-center">
              <div className="text-gray-600 mb-2">{day}</div>
              <div className="text-2xl mb-2">{icon}</div>
              <div className="text-gray-800">{temp}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ForecastCard;