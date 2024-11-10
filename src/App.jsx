// App.jsx
import { Routes, Route } from 'react-router-dom';
import { WeatherProvider } from './contexts/WeatherContext';
import Home from './pages/Home';
import WeatherDetails from './pages/WeatherDetails';
import ErrorBoundary from './components/ErrorBoundary';
import WeatherHeader from './components/WeatherHeader';
import FavoritesList from './components/FavoritesList';

const App = () => {
  return (
    <ErrorBoundary>
      <WeatherProvider>
        <div className="min-h-screen bg-gray-50">
          <WeatherHeader />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex gap-6">
              {/* Persistent Favorites Sidebar */}
              <aside className="w-64 shrink-0">
                <FavoritesList />
              </aside>
             
              {/* Main Content Area */}
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/weather" element={<WeatherDetails />} />
                </Routes>
              </main>
            </div>
          </div>
        </div>
      </WeatherProvider>
    </ErrorBoundary>
  );
};

export default App;