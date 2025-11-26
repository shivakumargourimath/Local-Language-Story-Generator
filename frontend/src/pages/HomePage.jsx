/**
 * Home Page Component
 * Beautiful landing page with navigation to main features
 */

import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const HomePage = () => {
  return (
    <Layout>
      <div className="relative min-h-[calc(100vh-theme(spacing.32))]">
        {/* Background with overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1200')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-pink-900/60 to-blue-900/70"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* Hero Section */}
            <div className="mb-12">
              <div className="text-6xl md:text-8xl mb-6 animate-bounce">
                📚✨🌙
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                Welcome to StoryLand
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-4 leading-relaxed drop-shadow">
                Create magical bedtime stories for your children
              </p>
              
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto drop-shadow">
                Generate personalized stories in your local language with beautiful narration. 
                Perfect for bedtime, teaching values, and making memories! 🌟
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-3">🎨</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Personalized</h3>
                <p className="text-gray-600 text-sm">Stories tailored to your child's name, age, and interests</p>
              </div>

              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-3">🌍</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Multi-Language</h3>
                <p className="text-gray-600 text-sm">8+ Indian languages including Hindi, Kannada, Tamil & more</p>
              </div>

              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-3">🎧</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Audio Stories</h3>
                <p className="text-gray-600 text-sm">Convert stories to beautiful audio narration</p>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/generate"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl hover:shadow-purple-500/50 transform hover:scale-110 transition-all duration-300"
              >
                <span className="mr-2">✨</span>
                Generate a Story
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>

              <Link
                to="/history"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-purple-600 bg-white rounded-full shadow-2xl hover:shadow-white/50 transform hover:scale-110 transition-all duration-300"
              >
                <span className="mr-2">📖</span>
                View Story History
              </Link>
            </div>

            {/* Stats or Additional Info */}
            <div className="mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 text-white">
                <div className="text-3xl font-bold mb-1">10+</div>
                <div className="text-sm">Moral Values</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 text-white">
                <div className="text-3xl font-bold mb-1">8+</div>
                <div className="text-sm">Languages</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 text-white">
                <div className="text-3xl font-bold mb-1">AI</div>
                <div className="text-sm">Powered</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
