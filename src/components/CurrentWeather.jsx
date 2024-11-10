const CurrentWeather = () => {
    return (
      <div className="bg-blue-50 p-6 rounded-xl">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <span className="text-4xl">☀️</span>
            <div className="text-5xl font-semibold">75°F</div>
          </div>
          <div className="text-lg text-gray-600">Sunny</div>
        </div>
        
        <div className="mt-6 flex gap-6">
          <div className="flex items-center gap-2">
            <span className="text-blue-500">💧</span>
            <span className="text-gray-600">Humidity: 60%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-500">💨</span>
            <span className="text-gray-600">Wind: 5 mph</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default CurrentWeather;