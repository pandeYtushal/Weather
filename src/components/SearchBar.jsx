import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ onSearch, isLoading }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search for a city..."
          disabled={isLoading}
          className="w-full glass-card px-6 py-4 pr-14 rounded-2xl text-gray-800 dark:text-black placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 
          focus:ring-blue-500 dark:focus:ring-blue-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"/>
        <button
          type="submit"
          disabled={isLoading || !city.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-blue-500 hover:bg-blue-600
           disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white rounded-xl transition-all disabled:cursor-not-allowed">
          <Search className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}
