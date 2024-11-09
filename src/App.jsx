import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WeatherProvider } from './contexts/WeatherContext';
import Home from './pages/Home';
import WeatherDetails from './pages/WeatherDetails';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <ErrorBoundary>
        <WeatherProvider>
          <Router>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Routes>
                <Route
                  path="/"
                  element={
                    <div className="animate-fadeIn">
                      <Home />
                    </div>
                  }
                />
                <Route
                  path="/weather"
                  element={
                    <div className="animate-fadeIn">
                      <WeatherDetails />
                    </div>
                  }
                  errorElement={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
                        <h2 className="text-2xl font-semibold text-red-700 mb-2">
                          Oops! Something went wrong
                        </h2>
                        <p className="text-red-600">
                          Please try refreshing the page or come back later.
                        </p>
                      </div>
                    </div>
                  }
                />
                <Route
                  path="*"
                  element={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                          404 - Page Not Found
                        </h2>
                        <p className="text-gray-600 mb-4">
                          The page you&apos;re looking for doesn&apos;t exist.
                        </p>
                        <a
                          href="/"
                          className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                        >
                          Go Home
                        </a>
                      </div>
                    </div>
                  }
                />
              </Routes>
            </div>
          </Router>
        </WeatherProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;