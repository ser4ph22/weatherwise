import { Outlet } from 'react-router-dom';
import SearchBar from './SearchBar';
import FavoritesList from './FavoritesList';
import logo from '../images/logo.png';  // Import the logo

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img 
                src={logo}  // Use the imported logo
                alt="WeatherWise Logo" 
                className="h-8 w-8"
              />
              <h1 className="text-xl font-semibold text-gray-900">WeatherWise</h1>
            </div>
            <div className="w-full max-w-xl mx-4">
              <SearchBar />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-4">
              <FavoritesList />
            </div>
          </aside>
          
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;