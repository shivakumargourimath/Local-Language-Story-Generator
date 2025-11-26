/**
 * Layout Component
 * Wrapper component with navbar and footer
 */

import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white mt-12 py-6 shadow-md">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>Made with ❤️ for kids | Powered by Groq AI & ElevenLabs</p>
          <p className="text-sm mt-1">© 2025 StoryLand - Creating magical bedtime stories</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
