import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-blue-500">
            🎮 Gaming Blog
          </Link>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-blue-400 transition">Home</Link>
            <Link to="/games" className="hover:text-blue-400 transition">Games</Link>
            <Link to="/news" className="hover:text-blue-400 transition">News</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
