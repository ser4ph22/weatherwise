import { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Will implement actual search functionality later
    console.log('Searching for:', query);
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="relative">
        <Search 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          size={20}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />
      </div>
    </form>
  );
};

export default SearchBar;