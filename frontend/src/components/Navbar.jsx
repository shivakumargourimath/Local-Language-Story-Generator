/**
 * Navbar Component
 * Navigation bar for the application
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">📚</span>
            <span className="text-xl font-bold text-primary">StoryLand</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1 md:space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive('/')
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-purple-50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/generate"
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive('/generate')
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-purple-50'
              }`}
            >
              Generate
            </Link>
            <Link
              to="/history"
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive('/history')
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-purple-50'
              }`}
            >
              History
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
